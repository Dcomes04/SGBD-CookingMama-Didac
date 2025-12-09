# Esquema de Dades del Backend i Rol de Monstache

## 1. Esquema de Dades - Col·lecció `recipes` (general_receta)

La col·lecció `recipes` a MongoDB conté les receptes del sistema. A continuació es detalla l'esquema complet:

### Camps Principals

| Camp | Tipus | Obligatori | Descripció |
|------|-------|------------|------------|
| `_id` | ObjectId | Sí (auto) | Identificador únic de MongoDB |
| `title` | String | **Sí** | Títol de la recepta |
| `slug` | String | **Sí** (únic) | Identificador URL-friendly (generat automàticament) |
| `description` | String | No | Descripció de la recepta |
| `cuisine` | String | No | Tipus de cuina (ex: "Italiana", "Española", "Mediterranea") |
| `course` | String | No | Tipus de plat (ex: "Principal", "Entrante", "Postre", "Sopa") |
| `difficulty` | String | No | Nivell de dificultat: `"easy"`, `"medium"`, `"hard"` (per defecte: `"medium"`) |
| `servings` | Number | No | Nombre de racions (per defecte: 2) |
| `prepTimeMinutes` | Number | No | Temps de preparació en minuts |
| `cookTimeMinutes` | Number | No | Temps de cocció en minuts |
| `totalTimeMinutes` | Number | No | Temps total (calculat automàticament: prep + cook) |
| `tags` | Array[String] | No | Array de tags (ex: `["pasta", "vegetariano", "rapido"]`) |
| `ingredients` | Array[Object] | No | Array d'ingredients (veure estructura a continuació) |
| `instructions` | Array[String] | No | Array de passos/instruccions de la recepta |
| `tips` | Array[String] | No | Array de consells/trucs |
| `nutrition` | Object | No | Informació nutricional (veure estructura a continuació) |
| `imageUrl` | String | No | URL de la imatge de la recepta |
| `videoUrl` | String | No | URL del vídeo de la recepta |
| `source` | String | No | Font d'origen de la recepta |
| `createdBy` | String | No | Identificador de l'usuari que va crear la recepta |
| `createdAt` | Date | Sí (auto) | Timestamp de creació (generat automàticament) |
| `updatedAt` | Date | Sí (auto) | Timestamp d'actualització (generat automàticament) |

### Estructura de `ingredients` (Array d'Objectes)

Cada element de l'array `ingredients` té la següent estructura:

```javascript
{
  ingredientId: ObjectId,    // Referència a la col·lecció ingredients
  name: String,               // Nom de l'ingredient (obligatori)
  quantity: Number,           // Quantitat (opcional)
  unit: String,               // Unitat (ex: "g", "unidad", "cda", "cdita")
  optional: Boolean,          // Si és opcional (per defecte: false)
  notes: String              // Notes addicionals (opcional)
}
```

**Exemple:**
```json
{
  "ingredientId": ObjectId("507f1f77bcf86cd799439012"),
  "name": "Pasta espagueti",
  "quantity": 400,
  "unit": "g",
  "optional": false,
  "notes": null
}
```

### Estructura de `nutrition` (Objecte)

```javascript
{
  calories: Number,    // Calories per ració
  protein: Number,    // Proteïnes en grams
  carbs: Number,       // Carbohidrats en grams
  fat: Number,         // Greixos en grams
  fiber: Number,       // Fibra en grams
  sugar: Number        // Sucre en grams
}
```

**Exemple:**
```json
{
  "calories": 520,
  "protein": 18,
  "carbs": 72,
  "fat": 18,
  "fiber": 6,
  "sugar": 9
}
```

### Índexs de MongoDB

El model defineix un índex de text per a cerques ràpides:

```javascript
{
  title: 'text',
  description: 'text',
  tags: 'text',
  cuisine: 'text',
  course: 'text',
  'ingredients.name': 'text'
}
```

### Hooks Automàtics

- **Pre-save**: Calcula automàticament `totalTimeMinutes` = `prepTimeMinutes` + `cookTimeMinutes`
- **Pre-findOneAndUpdate**: Actualitza `totalTimeMinutes` quan es modifiquen els temps

---

## 2. Esquema de Dades - Col·lecció `ingredients` (general_ingrediente)

La col·lecció `ingredients` a MongoDB conté el catàleg d'ingredients disponibles al sistema.

### Camps Principals

| Camp | Tipus | Obligatori | Descripció |
|------|-------|------------|------------|
| `_id` | ObjectId | Sí (auto) | Identificador únic de MongoDB |
| `name` | String | **Sí** (únic) | Nom de l'ingredient (ha de ser únic) |
| `category` | String | No | Categoria de l'ingredient (ex: "Verduras", "Carnes", "Lacteos") |
| `description` | String | No | Descripció de l'ingredient |
| `nutrition` | Object | No | Informació nutricional per 100g (veure estructura a continuació) |
| `seasonality` | Array[String] | No | Mesos d'estació (ex: `["enero", "febrero", "marzo"]`) |
| `storage` | String | No | Instruccions d'emmagatzematge |
| `createdAt` | Date | Sí (auto) | Timestamp de creació |
| `updatedAt` | Date | Sí (auto) | Timestamp d'actualització |

### Estructura de `nutrition` (Objecte)

Idèntica a la de `recipes`:

```javascript
{
  calories: Number,    // Calories per 100g
  protein: Number,     // Proteïnes en grams per 100g
  carbs: Number,       // Carbohidrats en grams per 100g
  fat: Number,         // Greixos en grams per 100g
  fiber: Number,       // Fibra en grams per 100g
  sugar: Number        // Sucre en grams per 100g
}
```

### Índexs de MongoDB

```javascript
{
  name: 'text',
  description: 'text',
  category: 'text'
}
```

---

## 3. Rol de Monstache en la Sincronització MongoDB ↔ Elasticsearch

### Què és Monstache?

**Monstache** és una eina de sincronització en temps real que connecta MongoDB amb Elasticsearch. Actua com a "connector" que escolta els canvis a MongoDB (mitjançant Change Streams o OpLog) i els replica automàticament a Elasticsearch.

### Configuració al Projecte

El fitxer `monstache.toml` defineix la configuració:

```toml
# Connexions
mongo-url = "mongodb://mongo:27017/?replicaSet=rs0"
elasticsearch-urls = ["http://es:9200"]

# Configuració global
dropped-collections = false      # No elimina índexs quan s'eliminen col·leccions
dropped-databases = false         # No elimina índexs quan s'eliminen bases de dades
resume = true                     # Reprèn després de reiniciar
resume-name = "monstache-sync"    # Nom del checkpoint
verbose = true                    # Logs detallats

# Col·leccions a sincronitzar
direct-read-namespaces = [
  "appdb.recipes",
  "appdb.ingredients",
  "appdb.users"
]

# Mapping de col·leccions a índexs d'Elasticsearch
[[mapping]]
namespace = "appdb.recipes"
index = "recipes"

[[mapping]]
namespace = "appdb.ingredients"
index = "ingredients"

[[mapping]]
namespace = "appdb.users"
index = "users"
```

### Com Funciona Monstache?

1. **Conexió a MongoDB Replica Set**
   - Monstache es connecta a MongoDB configurat com a Replica Set (`rs0`)
   - Utilitza l'OpLog (Operation Log) de MongoDB per detectar canvis

2. **Detecció de Canvis**
   - Monstache escolta contínuament l'OpLog de MongoDB
   - Detecta operacions: `insert`, `update`, `delete`

3. **Sincronització Automàtica**
   - Quan es crea un document → Monstache l'indexa a Elasticsearch
   - Quan s'actualitza un document → Monstache actualitza l'índex
   - Quan s'elimina un document → Monstache l'elimina de l'índex

4. **Mapping de Col·leccions**
   - `appdb.recipes` → Índex `recipes` a Elasticsearch
   - `appdb.ingredients` → Índex `ingredients` a Elasticsearch
   - `appdb.users` → Índex `users` a Elasticsearch

### Flux de Sincronització

```
┌─────────────┐         ┌──────────────┐         ┌──────────────┐
│   MongoDB   │         │   Monstache   │         │ Elasticsearch│
│  (appdb)    │         │  (Connector)  │         │   (Index)    │
└──────┬──────┘         └──────┬───────┘         └──────┬───────┘
       │                       │                       │
       │ 1. INSERT/UPDATE/    │                       │
       │    DELETE operation   │                       │
       ├──────────────────────>│                       │
       │                       │                       │
       │                       │ 2. Detecta canvi     │
       │                       │    via OpLog          │
       │                       │                       │
       │                       │ 3. Indexa/Actualitza/ │
       │                       │    Elimina document    │
       │                       ├───────────────────────>│
       │                       │                       │
       │                       │ 4. Confirmació        │
       │                       │<───────────────────────┤
```

### Avantatges de Monstache

1. **Sincronització Automàtica**
   - No cal gestionar manualment la sincronització des de l'API
   - Els canvis es repliquen en temps real

2. **Resiliència**
   - Amb `resume = true`, Monstache guarda checkpoints
   - Si es reinicia, reprèn des de l'últim punt sincronitzat
   - No es perden canvis durant reinicis

3. **Desacoblament**
   - L'API no necessita conèixer els detalls d'Elasticsearch
   - Monstache gestiona la transformació i indexació

4. **Performance**
   - Utilitza l'OpLog de MongoDB (eficient)
   - Processa canvis de forma asíncrona
   - No afegeix càrrega a les operacions de l'API

### Sincronització Dual al Projecte

El projecte utilitza una **estratègia dual**:

1. **Monstache (Automàtic)**: Sincronització en temps real de tots els canvis
2. **API Manual (Fallback)**: L'API també indexa manualment per garantir sincronització immediata

**Exemple del codi de l'API (`POST /recipes`):**
```javascript
// Crea a MongoDB
const recipe = await Recipe.create({ ... });

// Indexa manualment a Elasticsearch (com a fallback)
try {
  await es.index({
    index: 'recipes',
    id: recipe._id.toString(),
    document: recipe.toObject(),
    refresh: 'wait_for'
  });
} catch (esErr) {
  console.error('⚠️ Error indexing new recipe:', esErr.message);
  // No falla la petició, Monstache ho farà després
}
```

**Razó de la doble sincronització:**
- **API manual**: Garanteix que els canvis són immediats per a cerques
- **Monstache**: Assegura que no es perden canvis si l'API falla o hi ha problemes de xarxa

### Configuració al Docker Compose

```yaml
monstache:
  image: rwynn/monstache:6.7.7
  container_name: monstache
  depends_on: [mongo, es, mongo-init-replica]
  volumes:
    - ./monstache.toml:/monstache.toml
  command: ["-f", "/monstache.toml"]
```

Monstache s'inicia automàticament amb Docker i comença a sincronitzar immediatament.

### Transformacions Opcionals

Monstache permet transformar documents abans d'indexar-los mitjançant un pipeline JavaScript (actualment comentat al `monstache.toml`):

```toml
js-pipeline = """
module.exports = function(doc, ns) {
  if (ns == 'appdb.recipes') {
    // Transformacions personalitzades
    doc.search_name = (doc.title || '').toLowerCase();
  }
  return doc;
}
"""
```

### Resum del Rol de Monstache

| Aspecte | Descripció |
|---------|------------|
| **Funció Principal** | Sincronitzar automàticament MongoDB → Elasticsearch |
| **Mètode** | OpLog / Change Streams de MongoDB |
| **Temps Real** | Sí, sincronització immediata |
| **Resiliència** | Checkpoints per recuperar-se després de reinicis |
| **Col·leccions** | `recipes`, `ingredients`, `users` |
| **Índexs ES** | `recipes`, `ingredients`, `users` |
| **Configuració** | `monstache.toml` |
| **Execució** | Container Docker independent |

---

## 4. Comparació: Monstache vs Sincronització Manual

| Característica | Monstache | API Manual |
|----------------|-----------|------------|
| **Automatització** | Totalment automàtic | Requereix codi a cada endpoint |
| **Temps Real** | Sí (via OpLog) | Sí (immediat) |
| **Resiliència** | Alta (checkpoints) | Depèn de l'API |
| **Manteniment** | Baix (configuració única) | Alt (codi a múltiples llocs) |
| **Performance** | Asíncron, no bloqueja | Síncron, pot bloquejar |
| **Errors** | No afecta l'API | Pot afectar la resposta |
| **Ús Recomanat** | Sincronització general | Sincronització crítica immediata |

---

## 5. Exemple Pràctic de Flux

### Escenari: Crear una Nova Recepta

1. **Client fa POST a `/recipes`**
   ```bash
   POST /recipes
   { "title": "Pasta Carbonara", ... }
   ```

2. **API crea a MongoDB**
   - Document creat a `appdb.recipes`
   - MongoDB registra l'operació a l'OpLog

3. **API indexa manualment (opcional)**
   - L'API també pot indexar directament a Elasticsearch
   - Això garanteix disponibilitat immediata

4. **Monstache detecta el canvi**
   - Llegeix l'OpLog de MongoDB
   - Detecta el nou document

5. **Monstache indexa a Elasticsearch**
   - Crea/actualitza el document a l'índex `recipes`
   - Si l'API ja ho va fer, és una operació idempotent

6. **Resultat**
   - Document disponible a MongoDB
   - Document disponible a Elasticsearch
   - Cerques funcionen immediatament

### Escenari: Actualitzar una Recepta

1. **Client fa PATCH a `/recipes/:id`**
2. **API actualitza a MongoDB**
3. **API actualitza manualment a Elasticsearch (opcional)**
4. **Monstache detecta l'actualització via OpLog**
5. **Monstache sincronitza a Elasticsearch**

### Escenari: Eliminar una Recepta

1. **Client fa DELETE a `/recipes/:id`**
2. **API elimina de MongoDB**
3. **API elimina manualment d'Elasticsearch (opcional)**
4. **Monstache detecta l'eliminació via OpLog**
5. **Monstache elimina d'Elasticsearch**

---

## 6. Troubleshooting

### Monstache no sincronitza

1. **Verificar que MongoDB està en Replica Set**
   ```bash
   mongosh --eval "rs.status()"
   ```

2. **Verificar logs de Monstache**
   ```bash
   docker logs monstache
   ```

3. **Verificar connexió a Elasticsearch**
   ```bash
   curl http://localhost:9200
   ```

4. **Verificar configuració**
   - Revisar `monstache.toml`
   - Verificar que els noms de col·leccions coincideixen

### Documents no apareixen a Elasticsearch

1. **Forçar refresh**
   ```bash
   curl -X POST "http://localhost:9200/recipes/_refresh"
   ```

2. **Verificar mapping**
   - Els documents poden estar indexats però amb mapping incorrecte
   - Revisar mapping a Kibana o via API

3. **Verificar checkpoint de Monstache**
   - Monstache guarda l'estat a MongoDB
   - Si hi ha problemes, pot ser necessari reiniciar Monstache

---

## 7. Conclusió

Monstache és essencial per mantenir MongoDB i Elasticsearch sincronitzats de forma automàtica i fiable. Actua com a "connector" transparent que:

- ✅ Detecta canvis en temps real
- ✅ Sincronitza automàticament
- ✅ És resilient a fallades
- ✅ No afegeix càrrega a l'API
- ✅ Simplifica el manteniment del codi

La combinació de Monstache (automàtic) + API manual (fallback) garanteix que les dades sempre estiguin sincronitzades i disponibles per a cerques.

