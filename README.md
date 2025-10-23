# MongoDB + Elasticsearch + Monstache + API (Node.js)

Proyecto de ejemplo con **MongoDB** como fuente de verdad, **Elasticsearch** para búsquedas full-text, **Monstache** para sincronización en tiempo real y una **API Node.js (Express)** para CRUD y búsquedas.

## 📦 Requisitos

- Docker y Docker Compose
- Node.js ≥ 18 (para la API)
- (Opcional) `curl` o Postman
- Windows PowerShell o bash/zsh (según tu entorno)

## 🧩 Arquitectura

- **MongoDB (replica set rs0)**: base de datos transaccional.
- **Elasticsearch**: índice `products` para búsqueda.
- **Kibana**: consola y UI para inspeccionar ES.
- **Monstache**: replica cambios de `MongoDB → Elasticsearch`.
- **API Node.js**: endpoints CRUD (Mongo) + búsqueda (ES).

## 🗂️ Estructura

```
.
├── docker-compose.yml
├── monstache.toml
├── products-mapping.json          # mapping y settings de ES
└── api/
    ├── package.json
    └── src/
        └── index.(js|mjs)
```

> Si usas CommonJS o ES Modules, asegúrate de que tu `package.json` y `src/index.js` coinciden con el estilo elegido.

## 🚀 Puesta en marcha

### 1) Levantar la infraestructura (Mongo, ES, Kibana, Monstache)

Desde la **raíz** del proyecto:

```bash
docker compose up -d
```

Verificación rápida:

```bash
# Elasticsearch vivo
curl http://localhost:9200
# Kibana activo
# Abre http://localhost:5601 en el navegador
```

> Si ES devuelve 401, tienes seguridad activada. En este proyecto está desactivada (`xpack.security.enabled=false`) para desarrollo.

### 2) Crear el índice de Elasticsearch (`products`)

#### Opción A: PowerShell (Windows)

```powershell
# Estando en la carpeta donde está products-mapping.json
Invoke-RestMethod `
  -Uri "http://localhost:9200/products" `
  -Method Put `
  -ContentType "application/json" `
  -InFile ".\products-mapping.json"
```

#### Opción B: curl “real” (Windows o Unix)

```bash
curl -X PUT "http://localhost:9200/products" \
  -H "Content-Type: application/json" \
  --data-binary "@products-mapping.json"
```

#### Opción C: Kibana

- Abre `http://localhost:5601` → **Dev Tools** → **Console**.
- Ejecuta:

```http
PUT /products
{  ...contenido de products-mapping.json...  }
```

Verificación:

```bash
curl http://localhost:9200/_cat/indices?v
curl http://localhost:9200/products/_mapping?pretty
```

### 3) Iniciar la API

Desde `./api`:

```bash
npm install
npm start
```

La API queda en: `http://localhost:3000`

## 🧪 Probar que todo funciona

### A) Insertar un documento (Mongo vía API)

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Zapatillas running",
    "brand":"Acme",
    "price":79.9,
    "tags":["deporte","running"],
    "description":"Cómodas y ligeras"
  }'
```

**Respuesta esperada (JSON):**
```json
{
  "_id": "...",
  "name": "Zapatillas running",
  "brand": "Acme",
  "price": 79.9,
  "tags": ["deporte", "running"],
  "description": "Cómodas y ligeras",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "__v": 0
}
```

> **Monstache** detectará el insert en Mongo y lo indexará en `products` (ES) automáticamente.

### B) Buscar en Elasticsearch

```bash
curl "http://localhost:9200/products/_search?q=running&pretty"
```

### C) Buscar vía API (ES bajo el capó)

```bash
curl "http://localhost:3000/search?q=running&brand=Acme"
```

## 🔌 Endpoints útiles (API)

- `POST /products` — crea producto (Mongo).
- `GET /products/:id` — obtiene producto (Mongo).
- `PATCH /products/:id` — actualiza (Mongo).
- `DELETE /products/:id` — elimina (Mongo).
- `GET /search` — busca en ES. Parámetros:
  - `q` (texto), `brand` (term), `minPrice`, `maxPrice`, `from`, `size`.

Ejemplo:

```
GET /search?q=running&brand=Acme&minPrice=50&maxPrice=100&size=5
```

## 🛠️ Notas de configuración

- **`products-mapping.json`** define:
  - Analyzer `multi_lang` (stopwords ES/EN).
  - Campos `name/description` como `text`; `brand/tags` como `keyword`; `price` `float`; `createdAt` `date`.

- **`monstache.toml`** incluye:
  - Conexión a `mongodb://mongo:27017/?replicaSet=rs0`.
  - `direct-read-namespaces` para backfill inicial (p. ej. `appdb.products`).
  - Mapeo `appdb.products → products` en ES.

- **`docker-compose.yml`**:
  - Mongo en modo replica set (`rs0`).
  - ES single-node con seguridad desactivada (dev).
  - Kibana apuntando a ES.
  - Monstache leyendo de Mongo y escribiendo en ES.

- **API**:
  - Conecta a Mongo en `mongodb://localhost:27017/appdb`.
  - Conecta a ES en `http://localhost:9200`.

> Si mueves servicios a la nube (Atlas / Elastic Cloud), sustituye URLs/credenciales y activa TLS.

## 🧯 Troubleshooting

- **`index_not_found_exception` al borrar** → El índice no existe todavía.
- **`resource_already_exists_exception` al crear** → El índice ya existe. Bórralo o crea alias.
- **PowerShell no entiende `-H`** → Usa `Invoke-RestMethod` o `curl.exe`.
- **No ves documentos en ES** → Revisa logs de `monstache`.
- **ES devuelve 401** → Usa `-u user:pass` o desactiva seguridad.

## 📚 Comandos útiles

```bash
# Ver índices
curl http://localhost:9200/_cat/indices?v

# Count de documentos
curl http://localhost:9200/products/_count

# Mapping y settings
curl http://localhost:9200/products/_mapping?pretty
curl http://localhost:9200/products/_settings?pretty

# Logs (Docker)
docker logs -f monstache
docker logs -f es
docker logs -f mongo
```

## ✅ Checklist rápido

- [ ] `docker compose up -d`
- [ ] `PUT /products` con `products-mapping.json`
- [ ] `npm install && npm start` en `api/`
- [ ] `POST /products` (insertar un doc)
- [ ] `GET /products/_search` en ES o `GET /search` en la API
