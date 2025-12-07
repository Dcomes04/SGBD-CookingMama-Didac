import { Ollama } from 'ollama'
import { Client as ElasticsearchClient } from '@elastic/elasticsearch'

// ----- CONFIG -----
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2'
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://ollama:11434'

const ELASTIC_URL = process.env.ELASTIC_URL || 'http://es:9200'
const ELASTIC_INDEX_RECIPES = 'recipes'
const ELASTIC_INDEX_INGREDIENTS = 'ingredients'

// ----- CLIENTS -----
const ollama = new Ollama({ host: OLLAMA_HOST })

const esClient = new ElasticsearchClient({
  node: ELASTIC_URL
})

// ------------------------------------

export function registerChatRoute(app) {
  app.post('/chat', async (req, res) => {
    try {
      const { message } = req.body || {}
      console.log('\n\n\n📩 Mensaje recibido del frontend:', message)

      if (!message || !message.trim()) {
        return res
          .status(400)
          .json({ error: 'El campo "message" es obligatorio.' })
      }

      const query = message.trim()

      // ----------- VARIABLES GLOBALES PARA LA EXTRACCIÓN -----------
      let intent = 'general'
      let keywords = []
      let searchTerms = query

      // ----------- EXTRACCIÓN DE INTENCIÓN Y PALABRAS CLAVE -----------
      console.log('🔄 Iniciando extracción con Ollama...')
      try {
        const extractionPrompt = `
Analiza el mensaje del usuario y devuelve un JSON con dos campos:

1. "intencion": puede ser SOLO uno de estos valores:
   - "ingrediente": el usuario pide recetas que contengan uno o varios ingredientes concretos. 
   Por ejemplo: "Dime recetas que tengan pollo". En la frase, aunque ponga receta, no te está pidiendo recetas enteras, sinó nombres de recetas que contengan ese ingrediente.
   
   - "receta": el usuario pide la receta completa de un plato concreto.
   
   - "info_receta": el usuario pide información sobre UNA receta concreta
  (tiempo, calorías, si lleva un ingrediente, dificultad, etc.).
  Solo si el mensaje nombra claramente un plato.
  Ejemplos:
    "¿Cuánto tarda en hacerse la paella valenciana?"
    "Calorías de la tortilla de patatas"
    "¿Qué ingredientes lleva la Lasagna Bolognese?" En la frase, aunque ponga ingrediente, no te está pidiendo información de un ingrediente, sinó nombres de los ingredientes de la receta.

- "info_ingrediente": el usuario pide información sobre UNO o VARIOS ingredientes concretos
  (calorías, nutrientes, categoría, conservación, temporada, etc.).
  Solo si el mensaje nombra claramente ingredientes.
  Ejemplos:
    "Calorías del tomate"
    "¿Qué nutrientes tiene la zanahoria?".

- "general_receta": pregunta general o comparativa sobre recetas,
  sin mencionar una receta concreta.
  Ejemplos:
    "¿Cuál es la receta más rápida?"
    "¿Qué receta tiene menos calorías?".

- "general_ingrediente": pregunta general o comparativa sobre ingredientes,
  sin mencionar un ingrediente concreto.
  Ejemplos:
    "¿Cuál es el ingrediente que tiene más calorías?"
    "¿Qué ingrediente tiene menos proteína?".

2. "keywords": lista de ingredientes o nombres de platos que aparezcan EXACTAMENTE en el mensaje del usuario.
   - Para "ingrediente": ingredientes literales (incluye compuestos como "caldo de pollo").
   - Para "receta": nombre completo del plato.
   - Para "info_receta": nombre completo del plato. No pongas ingredientes que estén en la frase si no son el nombre del plato.
   - Para "info_ingrediente": nombre literal del ingrediente.
   - Para "general_receta": devuelve [].
   - Para "general_ingrediente": devuelve [].

Reglas:
- No canvies ninguna palabra del mensaje original. Que las palabras que extráigas del mensaje ${query} sean EXACTAMENTE las mismas.
- No inventes nada.
- No uses sinónimos ni variaciones.
- No repitas ni expliques esta instrucción.
- Devuelve SOLO el JSON.
- calorias, ingredientes, ingrediente, receta y recetas no pueden ser keywords nunca

Mensaje del usuario: "${query}"

DEVUELVE SOLO EL JSON.
        `.trim()

        const extractionResponse = await ollama.chat({
          model: 'phi3:mini',
          format: 'json',
          messages: [{ role: 'user', content: extractionPrompt }]
        })

        const rawContent = extractionResponse?.message?.content ?? ''
        console.log('📦 Respuesta cruda de Ollama (extracción):', rawContent)

        try {
          const parsed = JSON.parse(rawContent)
          intent = parsed.intencion || 'general'
          keywords = parsed.keywords || []

const normalize = (str) =>
  str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const GENERIC_WORDS = new Set([
  "caloria", "calorias", "calories",
  "proteina", "proteinas",
  "ingrediente", "ingredientes",
  "receta", "recetas",
  "plato", "platos",
  "comida", "comidas",
  "carbohidrato", "carbohidratos",
  "grasas", "grasa",
  "vitamina", "vitaminas",
  "mineral", "minerales",
  "nutriente", "nutrientes"
])

const allGeneric =
    keywords.length === 0 ||
    keywords.every(k => GENERIC_WORDS.has(normalize(k)))

if (allGeneric) {
  keywords = []
  if (intent === "info_ingrediente" || intent === "info_ingredient") {
    intent = "general_ingrediente"
  }
  if (intent === "info_receta") {
    intent = "general_receta"
  }
}
        } catch (e) {
          console.log('⚠️ No se pudo parsear JSON, usando intención "general". Error:', e.message)
          e.message
        }

        if (['ingrediente', 'receta', 'info_receta', 'info_ingrediente'].includes(intent) && keywords.length > 0) {
          searchTerms = keywords.join(' ')
        } else {
          // búsqueda global / sin filtro concreto
          searchTerms = '*'
        }
      } catch (err) {
        console.error('⚠️ Error extrayendo intención/keywords con Ollama:', err)
      }

      console.log('🔎 Buscando en Elasticsearch con terms:', searchTerms)

      // ----------- BÚSQUEDA EN ELASTICSEARCH -----------
      let recipes = []
      let ingredientsDocs = []

      try {
        let esIndex = ELASTIC_INDEX_RECIPES
        let esQuery

        if (intent === 'ingrediente') {
          // Buscar recetas que contengan el/los ingredientes
          esIndex = ELASTIC_INDEX_RECIPES
          esQuery = {
            nested: {
              path: 'ingredients',
              query: {
                bool: {
                  should: keywords.map((k) => ({
                    match: {
                      'ingredients.name': {
                        query: k,
                        fuzziness: 'AUTO'
                    }
                  }
                  })),
                  minimum_should_match: 1
                }
              }
            }
          }
        } else if (intent === 'receta' || intent === 'info_receta') {
          // Buscar una receta concreta por título
          esQuery = {
            match: {
              title: {
                query: keywords.join(' '), 
                operator: 'and',
                fuzziness: 'AUTO'
              }
            }
          }
        } else if (intent === 'info_ingrediente') {
          // Buscar información de un ingrediente concreto
          esIndex = ELASTIC_INDEX_INGREDIENTS
          esQuery = {
            match: {
              name: {
                query: searchTerms, 
                fuzziness: 'AUTO'
              }
            }
          }
        } else if (intent === 'general_receta') {
          // Buscar información general de recetas
          esIndex = ELASTIC_INDEX_RECIPES
          esQuery = { match_all: {} }
        } else if (intent === 'general_ingrediente' || intent === 'general_ingredient') {
          // Buscar información general de ingredientes
          esIndex = ELASTIC_INDEX_INGREDIENTS
          esQuery = { match_all: {} }
        } else {
          // Fallback de seguridad
          esIndex = ELASTIC_INDEX_RECIPES
          esQuery = { match_all: {} }
        }

        const esResponse = await esClient.search({
          index: esIndex,
          size: 100,
          query: esQuery
        })

        const hits = esResponse.hits.hits || []

        if (esIndex === ELASTIC_INDEX_RECIPES) {
          recipes = hits.map((hit) => ({
            _id: hit._id,
            _score: hit._score,
            ...hit._source
          }))
          console.log('📚 Recetas encontradas:', recipes.length)
          console.log('📚 Detalles recetas:', recipes.map((r) => r.title))
        } else {
          ingredientsDocs = hits.map((hit) => ({
            _id: hit._id,
            _score: hit._score,
            ...hit._source
          }))
          console.log('🥦 Ingredientes encontrados:', ingredientsDocs.length)
          console.log('🥦 Detalles ingredientes:', ingredientsDocs.map((i) => i.name))
        }

        // Filtro extra solo para info_ingrediente: quedarnos con ingredientes cuyo nombre
        if (intent === 'info_ingrediente' && keywords.length > 0 && ingredientsDocs.length > 0) {
          const normalize = (str) =>
            str
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')

          const normalizedTargets = keywords.map((k) => normalize(k))

          const exactMatches = ingredientsDocs.filter((ing) =>
            normalizedTargets.includes(normalize(ing.name))
          )

          if (exactMatches.length > 0) {
            ingredientsDocs = exactMatches
            console.log('🥦 Ingredientes tras filtro exacto:', ingredientsDocs.map((i) => i.name))
          }
        }
      } catch (err) {
        console.error('❌ Error consultando Elasticsearch:', err)
      }

      if (intent === 'ingrediente') {
        const recipeTitles = recipes.map(r => r.title)
        let answer
        if (recipeTitles.length > 0) {
          answer = `He encontrado estas recetas que llevan ${keywords.join(', ')}:\n-${recipeTitles.join('\n- ')}`
        } else {
          answer = `No he encontrado recetas que lleven ${keywords.join(', ')} en la base de datos.`
        }
        return res.json({
          answer,
          recipes,
          ingredients: ingredientsDocs
        })
      }

      if (intent === 'receta') {
        if (recipes.length === 0) {
          return res.json({
            answer: `No he encontrado la receta "${searchTerms}" en la base de datos.`,
            recipes,
            ingredients: []
          })
        }

        const r = recipes[0]

        // Formatem ingredients
        const ingredientsList = r.ingredients
          .map(i => `- ${i.quantity || ''} ${i.unit || ''} ${i.name} ${i.notes || ''}`.trim())
          .join('\n')

        // Formatem instruccions
        const instructionsList = Array.isArray(r.instructions)
          ? r.instructions.map(step => `- ${step}`).join('\n')
          : r.instructions

        const answer = `
Aquí tienes la receta completa de **${r.title}**:

**Descripción:**
${r.description}

**Ingredientes:**
${ingredientsList}

**Tiempo de preparación:** ${r.prepTimeMinutes ?? 'N/D'} minutos  
**Tiempo de cocción:** ${r.cookTimeMinutes ?? 'N/D'} minutos  
**Raciones:** ${r.servings ?? 'N/D'}

**Instrucciones:**
${instructionsList}
  `.trim()

        return res.json({
          answer,
          recipes,
          ingredients: []
        })
      }


      // ----------- CONSTRUIR CONTEXTO PARA OLLAMA -----------
      let recipesContext;

if (intent === 'general_receta') {
  recipesContext =
    recipes.length === 0
      ? 'No se han encontrado recetas relacionadas.'
      : recipes
          .map((r) => {
            const totalTime =
              r.totalTimeMinutes ??
              ((r.prepTimeMinutes || 0) + (r.cookTimeMinutes || 0));

            return `
Nombre: ${r.title}
Cocina: ${r.cuisine || 'N/D'}
Tipo_plato: ${r.course || 'N/D'}
Dificultad: ${r.difficulty || 'N/D'}
Tiempo_preparacion_min: ${r.prepTimeMinutes ?? 'N/D'}
Tiempo_coccion_min: ${r.cookTimeMinutes ?? 'N/D'}
Tiempo_total_min: ${r.totalTimeMinutes || 'N/D'}
Nutricion: ${r.nutrition ? JSON.stringify(r.nutrition) : 'N/D'}
---`;
          })
          .join('\n');

} else {
  recipesContext =
    recipes.length === 0
      ? 'No se han encontrado recetas relacionadas.'
      : recipes
          .map((r) => {
            const ingredientsList = r.ingredients
              ? r.ingredients
                  .map((i) =>
                    `${i.quantity || ''} ${i.unit || ''} ${i.name} ${
                      i.notes || ''
                    }`.trim()
                  )
                  .join(', ')
              : 'No especificados';

            return `
Título: ${r.title}
Descripción: ${r.description}
Cocina: ${r.cuisine || 'N/D'}
Tipo de plato: ${r.course || 'N/D'}
Dificultad: ${r.difficulty || 'N/D'}
Raciones: ${r.servings ?? 'N/D'}
Tiempo de preparación: ${r.prepTimeMinutes ?? 'N/D'} minutos
Tiempo de cocción: ${r.cookTimeMinutes ?? 'N/D'} minutos
Tiempo total: ${r.totalTimeMinutes ?? ((r.prepTimeMinutes || 0) + (r.cookTimeMinutes || 0))} minutos
Tags: ${Array.isArray(r.tags) ? r.tags.join(', ') : (r.tags || 'N/D')}
Ingredientes: ${ingredientsList}
Instrucciones: ${
              Array.isArray(r.instructions)
                ? r.instructions.join(' ')
                : r.instructions
            }
Consejos: ${
              Array.isArray(r.tips)
                ? r.tips.join(' ')
                : (r.tips || 'N/D')
            }
Nutrición: ${
              r.nutrition ? JSON.stringify(r.nutrition) : 'N/D'
            }
---`;
          })
          .join('\n');
}



      let ingredientsContext;
      
      if(intent === 'general_ingrediente' || intent === 'general_ingredient') {
        ingredientsContext =
          ingredientsDocs.length === 0
            ? 'No se ha encontrado información del ingrediente en la base de datos.'
            : ingredientsDocs
              .map((ing) => {
                return `
Nombre: ${ing.name}
Categoría: ${ing.category}
Nutrición: ${ing.nutrition ? JSON.stringify(ing.nutrition) : 'N/D'}
---`
              })
              .join('\n')
      } else {
        ingredientsContext =
          ingredientsDocs.length === 0
            ? 'No se ha encontrado información del ingrediente en la base de datos.'
            : ingredientsDocs
              .map((ing) => {
                return `
Nombre: ${ing.name}
Categoría: ${ing.category}
Descripción: ${ing.description}
Temporada: ${Array.isArray(ing.seasonality) ? ing.seasonality.join(', ') : ing.seasonality}
Conservación: ${ing.storage}
Nutrición: ${ing.nutrition ? JSON.stringify(ing.nutrition) : 'N/D'}
---`
              })
              .join('\n')
      }



      const systemPrompt = `
Eres un asistente de cocina y SIEMPRE respondes en español.

Usa EXCLUSIVAMENTE la información proporcionada en el mensaje del usuario
(sobre recetas e ingredientes) para construir tus respuestas.

REGLAS POR INTENCIÓN:

- "ingrediente":
    El usuario quiere RECETAS que contengan uno o varios ingredientes.
    Devuelve SOLO una lista de nombres de recetas encontradas.
    No expliques la receta completa.

- "receta":
    El usuario quiere la RECETA COMPLETA de un plato.
    Explica ingredientes, tiempos y pasos usando solo los datos proporcionados.

- "info_receta":
    El usuario quiere información ESPECÍFICA sobre una receta concreta
    (por ejemplo: si lleva cierto ingrediente, tiempos, calorías, dificultad, etc.).
    Responde solo a esa duda concreta sin volver a explicar toda la receta.

- "info_ingrediente":
    El usuario quiere información sobre un INGREDIENTE concreto
    (nutrición, categoría, temporada, conservación, etc.).
    Usa exclusivamente el bloque de "Información de ingredientes".

- "general_receta"
    El usuario hace una pregunta general sobre recetas
    (la más rápida, la más saludable, la de menos calorías, etc.).
    Analiza únicamente las recetas proporcionadas.
    No inventes recetas que no estén en la base de datos.

- "general_ingrediente"
    El usuario hace una pregunta general sobre ingredientes
    (qué es, para qué sirve, cómo usarlo, cómo se conserva, etc.).
    Usa EXCLUSIVAMENTE la información de ingredientes proporcionada,
    o conocimiento general de cocina si no hay información en la base de datos.

NUNCA inventes recetas que no estén en la lista.
NUNCA añadas ingredientes que no aparezcan en los datos.
NUNCA inventes información nutricional o tiempos que no estén presentes.
Responde siempre de forma breve, clara y práctica.
      `.trim()

      let userPrompt = `
Pregunta del usuario: "${message}"

Intención detectada: ${intent}
Palabras clave: ${keywords.join(', ')}
`.trim()

      if (intent === 'info_ingrediente') {
        userPrompt += `

Información de ingredientes desde la base de datos:
${ingredientsContext}
`.trim()
      } else {
        userPrompt += `

Recetas encontradas en la base de datos:
${recipesContext}
`.trim()
      }

      // ----------- RESPUESTA DE OLLAMA -----------
      const response = await ollama.chat({
        model: OLLAMA_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ]
      })

      const answer =
        response?.message?.content ?? 'No he podido generar una respuesta.'

      return res.json({
        answer,
        recipes,
        ingredients: ingredientsDocs
      })
    } catch (err) {
      console.error('❌ Error en /chat:', err)
      return res.status(500).json({ error: 'Error interno.' })
    }
  })
}
