# Exemples de MongoDB, Elasticsearch i Endpoints de l'API

## 1. Exemple de Document MongoDB per a una Recepta

Un document de MongoDB per a una recepta té la següent estructura basada en el model `Recipe`:

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "title": "Espagueti al pomodoro",
  "slug": "espagueti-al-pomodoro",
  "description": "Receta clasica italiana con salsa de tomate fresca, albahaca y un toque de queso parmesano rallado.",
  "cuisine": "Italiana",
  "course": "Principal",
  "difficulty": "easy",
  "servings": 4,
  "prepTimeMinutes": 15,
  "cookTimeMinutes": 20,
  "totalTimeMinutes": 35,
  "tags": ["pasta", "vegetariano", "rapido"],
  "ingredients": [
    {
      "ingredientId": ObjectId("507f1f77bcf86cd799439012"),
      "name": "Pasta espagueti",
      "quantity": 400,
      "unit": "g",
      "optional": false,
      "notes": null
    },
    {
      "ingredientId": ObjectId("507f1f77bcf86cd799439013"),
      "name": "Tomate",
      "quantity": 6,
      "unit": "unidad",
      "optional": false,
      "notes": "maduro"
    },
    {
      "ingredientId": ObjectId("507f1f77bcf86cd799439014"),
      "name": "Ajo",
      "quantity": 3,
      "unit": "diente",
      "optional": false,
      "notes": null
    },
    {
      "ingredientId": ObjectId("507f1f77bcf86cd799439015"),
      "name": "Aceite de oliva virgen extra",
      "quantity": 3,
      "unit": "cda",
      "optional": false,
      "notes": null
    },
    {
      "ingredientId": ObjectId("507f1f77bcf86cd799439016"),
      "name": "Albahaca fresca",
      "quantity": 12,
      "unit": "hoja",
      "optional": false,
      "notes": null
    },
    {
      "ingredientId": ObjectId("507f1f77bcf86cd799439017"),
      "name": "Queso parmesano",
      "quantity": 40,
      "unit": "g",
      "optional": false,
      "notes": "rallado"
    }
  ],
  "instructions": [
    "Cocer la pasta en agua con sal hasta que quede al dente.",
    "Sofreir el ajo laminado en aceite de oliva sin que se dore en exceso.",
    "Agregar el tomate picado, salpimentar y cocinar 10 minutos hasta obtener salsa.",
    "Mezclar la pasta escurrida con la salsa y hojas de albahaca troceadas.",
    "Servir con queso parmesano rallado y un hilo de aceite crudo."
  ],
  "tips": [
    "Reserva un cazo del agua de coccion para ajustar la textura de la salsa.",
    "Agrega la albahaca al final para mantener el aroma fresco."
  ],
  "nutrition": {
    "calories": 520,
    "protein": 18,
    "carbs": 72,
    "fat": 18,
    "fiber": 6,
    "sugar": 9
  },
  "imageUrl": "https://media.istockphoto.com/id/155433188/es/foto/spaghetti-tomate-y-albahaca.jpg",
  "videoUrl": null,
  "source": "Recetario de la Nonna",
  "createdBy": "user123",
  "createdAt": ISODate("2024-01-15T10:30:00Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00Z"),
  "__v": 0
}
```

### Camps Principals:
- **`_id`**: Identificador únic de MongoDB (ObjectId)
- **`title`**: Títol de la recepta (obligatori)
- **`slug`**: URL-friendly identifier (únic, generat automàticament)
- **`ingredients`**: Array d'objectes amb referències als ingredients
- **`instructions`**: Array de strings amb els passos de la recepta
- **`difficulty`**: Nivell de dificultat (`easy`, `medium`, `hard`)
- **`nutrition`**: Objecte amb informació nutricional
- **`createdAt`/`updatedAt`**: Timestamps automàtics

---

## 2. Exemple de Query d'Elasticsearch per a la Cerca de Receptes

### Query Bàsica de Text

```json
{
  "index": "recipes",
  "from": 0,
  "size": 10,
  "query": {
    "bool": {
      "must": [
        {
          "multi_match": {
            "query": "pasta tomate",
            "type": "bool_prefix",
            "fields": [
              "title",
              "title._2gram",
              "title._3gram",
              "description",
              "description._2gram",
              "description._3gram",
              "ingredients.name",
              "ingredients.name._2gram",
              "ingredients.name._3gram"
            ]
          }
        }
      ],
      "filter": []
    }
  },
  "highlight": {
    "fields": {
      "title": {},
      "description": {},
      "ingredients.name": {}
    }
  }
}
```

### Query Amb Filtres Múltiples

```json
{
  "index": "recipes",
  "from": 0,
  "size": 20,
  "query": {
    "bool": {
      "must": [
        {
          "multi_match": {
            "query": "pollo",
            "type": "bool_prefix",
            "fields": [
              "title",
              "title._2gram",
              "title._3gram",
              "description",
              "description._2gram",
              "description._3gram",
              "ingredients.name",
              "ingredients.name._2gram",
              "ingredients.name._3gram"
            ]
          }
        },
        {
          "nested": {
            "path": "ingredients",
            "query": {
              "bool": {
                "should": [
                  {
                    "match": {
                      "ingredients.name": {
                        "query": "ajo"
                      }
                    }
                  },
                  {
                    "match": {
                      "ingredients.name": {
                        "query": "limon"
                      }
                    }
                  }
                ],
                "minimum_should_match": 1
              }
            }
          }
        }
      ],
      "filter": [
        {
          "term": {
            "cuisine.keyword": "Mediterranea"
          }
        },
        {
          "term": {
            "difficulty.keyword": "easy"
          }
        },
        {
          "terms": {
            "tags.keyword": ["rapido", "pollo"]
          }
        },
        {
          "range": {
            "totalTimeMinutes": {
              "lte": 45
            }
          }
        }
      ]
    }
  },
  "highlight": {
    "fields": {
      "title": {},
      "description": {},
      "ingredients.name": {}
    }
  },
  "aggs": {
    "all_ingredients": {
      "nested": {
        "path": "ingredients"
      },
      "aggs": {
        "ids": {
          "terms": {
            "field": "ingredients.ingredientId",
            "size": 100
          }
        }
      }
    }
  }
}
```

### Query Amb Agregacions per a Faceted Search

```json
{
  "index": "recipes",
  "from": 0,
  "size": 10,
  "query": {
    "bool": {
      "must": [
        {
          "match_all": {}
        }
      ],
      "filter": [
        {
          "term": {
            "difficulty.keyword": "medium"
          }
        }
      ]
    }
  },
  "aggs": {
    "cuisines": {
      "terms": {
        "field": "cuisine.keyword",
        "size": 20
      }
    },
    "difficulties": {
      "terms": {
        "field": "difficulty.keyword",
        "size": 10
      }
    },
    "tags": {
      "terms": {
        "field": "tags.keyword",
        "size": 30
      }
    },
    "time_ranges": {
      "range": {
        "field": "totalTimeMinutes",
        "ranges": [
          { "to": 30 },
          { "from": 30, "to": 60 },
          { "from": 60 }
        ]
      }
    }
  }
}
```

---

## 3. Endpoints Clau de l'API (Node.js)

### Endpoints que Consumeixen MongoDB

#### **POST /recipes** - Creació de Receptes
Crea una nova recepta a MongoDB i l'indexa a Elasticsearch.

**Request:**
```json
POST /recipes
Content-Type: application/json

{
  "title": "Risotto de Setas",
  "description": "Un risotto cremoso con setas frescas",
  "cuisine": "Italiana",
  "course": "Principal",
  "difficulty": "medium",
  "servings": 4,
  "prepTimeMinutes": 15,
  "cookTimeMinutes": 35,
  "tags": ["arroz", "setas", "cremoso"],
  "ingredients": [
    {
      "ingredientId": "507f1f77bcf86cd799439020",
      "quantity": 300,
      "unit": "g"
    },
    {
      "name": "Champinones",
      "quantity": 300,
      "unit": "g"
    }
  ],
  "instructions": [
    "En una sartén grande, calienta el aceite...",
    "Agrega las setas y cocina hasta que se ablanden..."
  ],
  "nutrition": {
    "calories": 550,
    "protein": 12,
    "carbs": 80,
    "fat": 20
  }
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439021",
  "title": "Risotto de Setas",
  "slug": "risotto-setas",
  ...
}
```

**Implementació:**
- Valida i normalitza les dades
- Resol les referències d'ingredients
- Genera un `slug` únic
- Crea el document a MongoDB
- Indexa automàticament a Elasticsearch

---

#### **GET /recipes** - Llista de Receptes (MongoDB)
Obté una llista de receptes des de MongoDB amb filtres opcionals.

**Request:**
```
GET /recipes?q=pasta&cuisine=Italiana&difficulty=easy&maxTime=30&from=0&size=10
```

**Query Parameters:**
- `q`: Cerca de text (utilitza índex de text de MongoDB)
- `cuisine`: Filtre per cuina
- `difficulty`: Filtre per dificultat
- `tags`: Tags separats per comes
- `ingredient`: Ingredients separats per comes
- `maxTime`: Temps màxim en minuts
- `from`: Offset per paginació
- `size`: Nombre de resultats (màx 100)

**Response:**
```json
{
  "total": 25,
  "from": 0,
  "size": 10,
  "results": [
    {
      "_id": "...",
      "title": "...",
      ...
    }
  ]
}
```

**Implementació:**
- Utilitza `$text` search de MongoDB per a la cerca de text
- Aplica filtres amb operadors de MongoDB (`$regex`, `$all`, `$lte`)
- Retorna resultats paginats

---

#### **GET /recipes/:idOrSlug** - Obtenir una Recepta
Obté una recepta específica per ID o slug des de MongoDB.

**Request:**
```
GET /recipes/risotto-setas
GET /recipes/507f1f77bcf86cd799439021
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439021",
  "title": "Risotto de Setas",
  "slug": "risotto-setas",
  ...
}
```

---

#### **PATCH /recipes/:idOrSlug** - Actualitzar Recepta
Actualitza una recepta a MongoDB i sincronitza amb Elasticsearch.

**Request:**
```json
PATCH /recipes/risotto-setas
Content-Type: application/json

{
  "title": "Risotto de Setas Premium",
  "difficulty": "hard",
  "instructions": [
    "Nou pas 1...",
    "Nou pas 2..."
  ]
}
```

**Implementació:**
- Actualitza el document a MongoDB
- Sincronitza automàticament amb Elasticsearch

---

#### **DELETE /recipes/:idOrSlug** - Eliminar Recepta
Elimina una recepta de MongoDB i d'Elasticsearch.

**Request:**
```
DELETE /recipes/risotto-setas
```

**Response:**
```json
{
  "ok": true
}
```

**Implementació:**
- Elimina de MongoDB
- Elimina de Elasticsearch

---

### Endpoints que Consumeixen Elasticsearch

#### **GET /search/recipes** o **GET /search** - Cerca Avançada
Cerca de receptes utilitzant Elasticsearch amb capacitats avançades de cerca.

**Request:**
```
GET /search/recipes?q=pasta&cuisine=Italiana&difficulty=easy,medium&ingredients=ajo,tomate&maxTime=45&from=0&size=20&refresh=true
```

**Query Parameters:**
- `q`: Query de text (multi-match amb suport per autocompletat)
- `cuisine`: Filtre per cuina (exact match)
- `difficulty`: Filtre per dificultat (suporta múltiples valors separats per comes)
- `tags`: Tags separats per comes
- `ingredients`: Ingredients separats per comes (cerca nested)
- `maxTime`: Temps màxim en minuts
- `from`: Offset per paginació
- `size`: Nombre de resultats (màx 100)
- `refresh`: Força refresh de l'índex (opcional)

**Response:**
```json
{
  "hits": {
    "total": {
      "value": 15,
      "relation": "eq"
    },
    "hits": [
      {
        "_id": "507f1f77bcf86cd799439021",
        "_index": "recipes",
        "_score": 2.5,
        "_source": {
          "title": "Espagueti al pomodoro",
          "description": "...",
          ...
        },
        "highlight": {
          "title": ["<em>Espagueti</em> al pomodoro"],
          "description": ["Receta clasica italiana con salsa de <em>tomate</em> fresca"]
        }
      }
    ]
  },
  "aggregations": {
    "all_ingredients": {
      "ids": {
        "buckets": [
          {
            "key": "507f1f77bcf86cd799439012",
            "doc_count": 8
          }
        ]
      }
    }
  }
}
```

**Implementació:**
- Utilitza `multi_match` amb `bool_prefix` per autocompletat
- Suporta cerca nested per ingredients
- Retorna highlights dels termes trobats
- Inclou agregacions per a faceted search
- Suporta múltiples valors per a filtres (ex: `difficulty=easy,medium`)

**Exemple de Query Generada:**
```javascript
{
  index: 'recipes',
  from: 0,
  size: 20,
  query: {
    bool: {
      must: [
        {
          multi_match: {
            query: 'pasta',
            type: 'bool_prefix',
            fields: [
              'title',
              'title._2gram',
              'title._3gram',
              'description',
              'description._2gram',
              'description._3gram',
              'ingredients.name',
              'ingredients.name._2gram',
              'ingredients.name._3gram'
            ]
          }
        },
        {
          nested: {
            path: 'ingredients',
            query: {
              bool: {
                should: [
                  { match: { 'ingredients.name': { query: 'ajo' } } },
                  { match: { 'ingredients.name': { query: 'tomate' } } }
                ],
                minimum_should_match: 1
              }
            }
          }
        }
      ],
      filter: [
        { term: { 'cuisine.keyword': 'Italiana' } },
        { terms: { 'difficulty.keyword': ['easy', 'medium'] } },
        { range: { totalTimeMinutes: { lte: 45 } } }
      ]
    }
  },
  highlight: {
    fields: {
      title: {},
      description: {},
      'ingredients.name': {}
    }
  }
}
```

---

### Comparació: MongoDB vs Elasticsearch

| Característica | MongoDB (`/recipes`) | Elasticsearch (`/search/recipes`) |
|----------------|---------------------|----------------------------------|
| **Cerca de Text** | Índex de text bàsic | Multi-match amb autocompletat |
| **Filtres** | Operadors MongoDB (`$regex`, `$all`) | Term filters precisos |
| **Highlights** | No suportat | Sí (resalta termes trobats) |
| **Agregacions** | Limitades | Potents (faceted search) |
| **Nested Queries** | Limitades | Suport complet per ingredients |
| **Paginació** | `skip`/`limit` | `from`/`size` |
| **Performance** | Bo per consultes simples | Òptim per cerques complexes |
| **Ús Recomanat** | CRUD, llistats simples | Cerca avançada, autocompletat |

---

## 4. Exemple d'Ús Completa

### Flux de Creació i Cerca

1. **Crear una recepta:**
```bash
curl -X POST http://localhost:3000/recipes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Pasta Carbonara",
    "description": "Pasta italiana con bacon, huevo y queso",
    "cuisine": "Italiana",
    "difficulty": "medium",
    "ingredients": [
      {"name": "Pasta", "quantity": 400, "unit": "g"},
      {"name": "Bacon", "quantity": 200, "unit": "g"}
    ],
    "instructions": ["Paso 1...", "Paso 2..."]
  }'
```

2. **Cercar amb MongoDB (simple):**
```bash
curl "http://localhost:3000/recipes?q=pasta&cuisine=Italiana"
```

3. **Cercar amb Elasticsearch (avançat):**
```bash
curl "http://localhost:3000/search/recipes?q=pasta&ingredients=bacon&difficulty=medium&maxTime=30"
```

---

## 5. Notes d'Implementació

### Sincronització MongoDB ↔ Elasticsearch

Quan es crea, actualitza o elimina una recepta:
- **POST /recipes**: Crea a MongoDB → Indexa a Elasticsearch
- **PATCH /recipes/:id**: Actualitza a MongoDB → Actualitza a Elasticsearch
- **DELETE /recipes/:id**: Elimina de MongoDB → Elimina d'Elasticsearch

Els errors d'Elasticsearch no fallen la petició, només es registren a la consola per mantenir la disponibilitat de l'API.

### Índexs i Mapping d'Elasticsearch

El mapping d'Elasticsearch s'hauria de configurar amb:
- Camps de text amb `search_as_you_type` per autocompletat
- Camps `.keyword` per filtres exactes
- Mapping `nested` per a l'array d'ingredients
- Analitzadors adequats per a text en català/castellà

