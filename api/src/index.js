import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Client } from '@elastic/elasticsearch';

const app = express();
app.use(cors());
app.use(express.json());

// ---- Config desde entorno con fallback ----
// En Docker: usa nombres de servicios (mongo, es)
// En local: usa localhost
const MONGO_URL = process.env.MONGO_URL
  || 'mongodb://localhost:27017/appdb?replicaSet=rs0';
const ELASTIC_URL = process.env.ELASTIC_URL || 'http://localhost:9200';

// ---- Conexión Mongo con logs y timeout razonable ----
const connectMongo = async (retries = 10) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(MONGO_URL, {
        serverSelectionTimeoutMS: 10000, // 10s para dar tiempo en Docker
      });
      console.log('✅ Mongo conectado:', MONGO_URL);
      return;
    } catch (err) {
      console.error(`❌ Error conectando a Mongo (intento ${i + 1}/${retries}):`, err.message);
      if (i < retries - 1) {
        console.log('Reintentando en 5 segundos...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      } else {
        console.error('❌ No se pudo conectar a Mongo después de', retries, 'intentos');
        process.exit(1);
      }
    }
  }
};

await connectMongo();

// ---- Cliente Elasticsearch ----
const es = new Client({ node: ELASTIC_URL });

// Verificar conexión a Elasticsearch
try {
  const info = await es.info();
  console.log('✅ Elasticsearch conectado:', info.cluster_name, info.version.number);
} catch (err) {
  console.error('⚠️  Error conectando a Elasticsearch:', err.message);
  console.error('La búsqueda puede no funcionar, pero la API seguirá corriendo.');
}

// ---- Esquema y modelo ----
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: String,
  price: Number,
  tags: [String],
  description: String,
  createdAt: { type: Date, default: Date.now }
}, { collection: 'products' });

const Product = mongoose.model('Product', productSchema);

// ---- Healthcheck útil ----
app.get('/health', async (req, res) => {
  try {
    await mongoose.connection.db.admin().command({ ping: 1 });
    const info = await es.info();
    res.json({
      ok: true,
      mongo: 'ok',
      elastic: {
        name: info.name,
        cluster: info.cluster_name,
        version: info.version.number
      }
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ---- CRUD Mongo ----
app.post('/products', async (req, res) => {
  try {
    const p = await Product.create(req.body);
    res.json(p);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Not found' });
    res.json(p);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.patch('/products/:id', async (req, res) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!p) return res.status(404).json({ error: 'Not found' });
    res.json(p);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ---- Búsqueda en ES ----
app.get('/search', async (req, res) => {
  try {
    const { q, brand, minPrice, maxPrice, from = 0, size = 10, refresh } = req.query;

    // Si se solicita refresh explícitamente o después de operaciones recientes
    if (refresh === 'true') {
      try {
        await es.indices.refresh({ index: 'products' });
      } catch (refreshErr) {
        console.warn('Refresh warning:', refreshErr.message);
      }
    }

    const must = [];
    if (q) {
      must.push({
        multi_match: {
          query: q,
          fields: ['name^3', 'description', 'tags'],
          fuzziness: 'AUTO'
        }
      });
    }

    const filter = [];
    // Filtro por brand (búsqueda exacta - debe coincidir exactamente con el valor almacenado)
    // Nota: Para campos keyword, la búsqueda es case-sensitive
    if (brand) {
      filter.push({ term: { brand } });
    }
    if (minPrice) filter.push({ range: { price: { gte: Number(minPrice) } } });
    if (maxPrice) filter.push({ range: { price: { lte: Number(maxPrice) } } });

    const r = await es.search({
      index: 'products',
      from: Number(from),
      size: Number(size),
      query: {
        bool: {
          must: must.length ? must : [{ match_all: {} }],
          filter
        }
      }
    });

    res.json(r.hits);
  } catch (e) {
    console.error('Search error:', e);
    res.status(400).json({ ok: false, error: e.message });
  }
});

app.listen(3000, () => console.log('🚀 API on http://localhost:3000'));
