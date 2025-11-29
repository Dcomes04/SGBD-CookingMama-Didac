import mongoose from 'mongoose';
import { Client as ElasticsearchClient } from '@elastic/elasticsearch';
import { Ingredient } from './models/ingredient.js';
import { Recipe } from './models/recipe.js';
import { ingredients } from './data/ingredients.js';
import { recipes } from './data/recipes.js';
import { ingredientIndexDefinition, recipeIndexDefinition } from './data/mappings.js';

const MONGO_URL =
  process.env.MONGO_URL || 'mongodb://localhost:27017/appdb?replicaSet=rs0';
const ELASTIC_URL = process.env.ELASTIC_URL || 'http://localhost:9200';

const es = new ElasticsearchClient({ node: ELASTIC_URL });

const connectMongo = async () => {
  await mongoose.connect(MONGO_URL, {
    serverSelectionTimeoutMS: 10000
  });
  console.log('✅ Mongo conectado para seed:', MONGO_URL);
};

const recreateIndex = async (indexName, body) => {
  const exists = await es.indices.exists({ index: indexName });
  if (exists) {
    await es.indices.delete({ index: indexName });
    console.log(`🗑️  Índice eliminado: ${indexName}`);
  }
  await es.indices.create({
    index: indexName,
    body
  });
  console.log(`📦 Índice creado: ${indexName}`);
};

const prepareRecipes = (ingredientDocs) => {
  const ingredientMap = new Map(
    ingredientDocs.map(doc => [doc.name, doc._id])
  );

  return recipes.map(recipe => {
    const { ingredients: ingredientList = [], ...rest } = recipe;
    const resolvedIngredients = ingredientList.map(item => {
      const ingredientId = ingredientMap.get(item.name);
      if (!ingredientId) {
        throw new Error(`Ingrediente "${item.name}" no encontrado para la receta "${recipe.title}"`);
      }
      return {
        ingredientId,
        name: item.name,
        quantity: item.quantity ?? null,
        unit: item.unit ?? null,
        optional: item.optional ?? false,
        notes: item.notes ?? ''
      };
    });

    return {
      ...rest,
      ingredients: resolvedIngredients
    };
  });
};

const seed = async () => {
  try {
    await connectMongo();
    console.log('🔌 Conectando a Elasticsearch:', ELASTIC_URL);
    const esInfo = await es.info();
    console.log('✅ Elasticsearch conectado:', esInfo.version.number);

    console.log('🛠️  Preparando índices en Elasticsearch...');
    await Promise.all([
      recreateIndex('ingredients', ingredientIndexDefinition),
      recreateIndex('recipes', recipeIndexDefinition)
    ]);

    console.log('🧹 Limpiando colecciones existentes...');
    await Promise.all([
      Ingredient.deleteMany({}),
      Recipe.deleteMany({})
    ]);

    console.log('🌱 Insertando ingredientes...');
    const ingredientDocs = await Ingredient.insertMany(ingredients, { ordered: true });
    console.log(`   → ${ingredientDocs.length} ingredientes insertados.`);

    console.log('🍽️ Preparando recetas con referencias de ingredientes...');
    let recipePayload;
    try {
      recipePayload = prepareRecipes(ingredientDocs);
    } catch (err) {
      console.error('❌ Error en prepareRecipes:', err);
      throw err;
    }

    console.log('📚 Insertando recetas...');
    const recipeDocs = await Recipe.insertMany(recipePayload, { ordered: true });
    console.log(`   → ${recipeDocs.length} recetas insertadas.`);

    console.log('🧾 Indexando recetas en Elasticsearch...');
    const operations = recipeDocs.flatMap(doc => {
      const plainDoc = doc.toObject();
      const id = plainDoc._id.toString();
      delete plainDoc._id;
      delete plainDoc.__v;
      return [
        { index: { _index: 'recipes', _id: id } },
        plainDoc
      ];
    });

    if (operations.length > 0) {
      const bulkResponse = await es.bulk({ refresh: true, operations });
      if (bulkResponse.errors) {
        const erroredDocuments = [];
        bulkResponse.items.forEach((action, i) => {
          const operation = Object.keys(action)[0];
          if (action[operation].error) {
            erroredDocuments.push({
              status: action[operation].status,
              error: action[operation].error,
              operation: operations[i * 2],
              document: operations[i * 2 + 1]
            });
          }
        });
        console.error('❌ Errores en bulk insert de ES:', JSON.stringify(erroredDocuments, null, 2));
      } else {
        console.log(`   ✅ ${recipeDocs.length} recetas indexadas en Elasticsearch.`);
      }
    }

    console.log('🔄 Refrescando índices de Elasticsearch...');
    await es.indices.refresh({ index: ['ingredients', 'recipes'] });

    console.log('✅ Seed completado con exito.');
  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    process.exitCode = 1;
  } finally {
    await es.close();
    await mongoose.disconnect();
    console.log('🔌 Conexion a Mongo cerrada.');
  }
};

seed();
