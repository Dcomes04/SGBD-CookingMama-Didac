# Guía de Filtros de la API - Frontend

## Endpoints Disponibles

### 1. GET /recipes (MongoDB)
Endpoint que consulta directament MongoDB. Ideal para listados simples y filtros básicos.

### 2. GET /search/recipes o GET /search (Elasticsearch)
Endpoint que utiliza Elasticsearch. Ideal para búsquedas avanzadas con autocompletado y mejores resultados.

---

## Filtros Disponibles

Ambos endpoints soportan los siguientes filtros mediante query parameters:

### ✅ Filtros Implementados

| Filtro | Parámetro | Tipo | Descripción | Ejemplo |
|--------|-----------|------|-------------|---------|
| **Cuisine** | `cuisine` | String | Filtra por tipo de cocina | `?cuisine=Italiana` |
| **Course** | `course` | String | Filtra por tipo de plato | `?course=Principal` |
| **Difficulty** | `difficulty` | String | Filtra por dificultad | `?difficulty=easy` |
| **Tags** | `tags` | String/Array | Filtra por etiquetas (múltiples) | `?tags=pasta,vegetariano` |
| **Ingredients** | `ingredient` o `ingredients` | String/Array | Filtra por ingredientes | `?ingredients=ajo,tomate` |
| **Tiempo Máximo** | `maxTime` | Number | Filtra por tiempo máximo en minutos | `?maxTime=30` |
| **Búsqueda de Texto** | `q` | String | Búsqueda de texto libre | `?q=pasta` |
| **Paginación** | `from` | Number | Offset para paginación | `?from=0` |
| **Tamaño** | `size` | Number | Número de resultados (máx 100) | `?size=20` |

---

## Ejemplos de Uso desde el Frontend

### Ejemplo 1: Filtrar por Cuisine

```javascript
// JavaScript/Fetch
const response = await fetch('http://localhost:3000/recipes?cuisine=Italiana');
const data = await response.json();
console.log(data.results); // Array de recetas italianas

// Con múltiples parámetros
const response2 = await fetch(
  'http://localhost:3000/recipes?cuisine=Italiana&difficulty=easy&size=10'
);
```

```typescript
// TypeScript con axios
import axios from 'axios';

const getRecipesByCuisine = async (cuisine: string) => {
  const response = await axios.get('/recipes', {
    params: {
      cuisine,
      size: 20
    }
  });
  return response.data.results;
};

// Uso
const italianRecipes = await getRecipesByCuisine('Italiana');
```

### Ejemplo 2: Filtrar por Course

```javascript
// Filtrar solo platos principales
const response = await fetch('http://localhost:3000/recipes?course=Principal');

// Filtrar postres
const desserts = await fetch('http://localhost:3000/recipes?course=Postre');

// Filtrar sopas
const soups = await fetch('http://localhost:3000/recipes?course=Sopa');
```

### Ejemplo 3: Filtrar por Course Y Cuisine (Combinados)

```javascript
// Recetas italianas que sean platos principales
const response = await fetch(
  'http://localhost:3000/recipes?cuisine=Italiana&course=Principal'
);

// Postres italianos
const italianDesserts = await fetch(
  'http://localhost:3000/recipes?cuisine=Italiana&course=Postre'
);
```

### Ejemplo 4: Múltiples Filtros Combinados

```javascript
// React Hook personalizado
import { useState, useEffect } from 'react';

const useRecipes = (filters = {}) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (filters.cuisine) params.append('cuisine', filters.cuisine);
      if (filters.course) params.append('course', filters.course);
      if (filters.difficulty) params.append('difficulty', filters.difficulty);
      if (filters.tags) params.append('tags', filters.tags.join(','));
      if (filters.maxTime) params.append('maxTime', filters.maxTime);
      if (filters.q) params.append('q', filters.q);
      params.append('size', filters.size || 20);

      const response = await fetch(`/recipes?${params.toString()}`);
      const data = await response.json();
      setRecipes(data.results);
      setLoading(false);
    };

    fetchRecipes();
  }, [filters]);

  return { recipes, loading };
};

// Uso en componente
const RecipeList = () => {
  const { recipes, loading } = useRecipes({
    cuisine: 'Italiana',
    course: 'Principal',
    difficulty: 'easy',
    maxTime: 45
  });

  if (loading) return <div>Cargando...</div>;
  
  return (
    <div>
      {recipes.map(recipe => (
        <div key={recipe._id}>{recipe.title}</div>
      ))}
    </div>
  );
};
```

### Ejemplo 5: Búsqueda Avanzada con Elasticsearch

```javascript
// Usar el endpoint de búsqueda avanzada
const advancedSearch = async (query, filters) => {
  const params = new URLSearchParams();
  
  if (query) params.append('q', query);
  if (filters.cuisine) params.append('cuisine', filters.cuisine);
  if (filters.course) params.append('course', filters.course);
  if (filters.difficulty) params.append('difficulty', filters.difficulty);
  if (filters.ingredients) {
    params.append('ingredients', Array.isArray(filters.ingredients) 
      ? filters.ingredients.join(',') 
      : filters.ingredients
    );
  }
  params.append('size', filters.size || 20);

  const response = await fetch(`/search/recipes?${params.toString()}`);
  const data = await response.json();
  
  return {
    recipes: data.hits.map(hit => hit._source),
    total: data.total.value,
    highlights: data.hits.map(hit => hit.highlight)
  };
};

// Uso
const results = await advancedSearch('pasta', {
  cuisine: 'Italiana',
  course: 'Principal',
  ingredients: ['ajo', 'tomate']
});
```

### Ejemplo 6: Componente React con Filtros Dinámicos

```jsx
import React, { useState } from 'react';

const RecipeFilter = () => {
  const [filters, setFilters] = useState({
    cuisine: '',
    course: '',
    difficulty: '',
    maxTime: ''
  });
  const [recipes, setRecipes] = useState([]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const searchRecipes = async () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    const response = await fetch(`/recipes?${params.toString()}`);
    const data = await response.json();
    setRecipes(data.results);
  };

  return (
    <div>
      <div className="filters">
        <select 
          value={filters.cuisine}
          onChange={(e) => handleFilterChange('cuisine', e.target.value)}
        >
          <option value="">Todas las cocinas</option>
          <option value="Italiana">Italiana</option>
          <option value="Española">Española</option>
          <option value="Mediterranea">Mediterránea</option>
          <option value="Asiatica">Asiática</option>
        </select>

        <select 
          value={filters.course}
          onChange={(e) => handleFilterChange('course', e.target.value)}
        >
          <option value="">Todos los platos</option>
          <option value="Principal">Principal</option>
          <option value="Entrante">Entrante</option>
          <option value="Postre">Postre</option>
          <option value="Sopa">Sopa</option>
          <option value="Desayuno">Desayuno</option>
        </select>

        <select 
          value={filters.difficulty}
          onChange={(e) => handleFilterChange('difficulty', e.target.value)}
        >
          <option value="">Todas las dificultades</option>
          <option value="easy">Fácil</option>
          <option value="medium">Media</option>
          <option value="hard">Difícil</option>
        </select>

        <input
          type="number"
          placeholder="Tiempo máximo (min)"
          value={filters.maxTime}
          onChange={(e) => handleFilterChange('maxTime', e.target.value)}
        />

        <button onClick={searchRecipes}>Buscar</button>
      </div>

      <div className="results">
        {recipes.map(recipe => (
          <div key={recipe._id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <span>Cocina: {recipe.cuisine}</span>
            <span>Plato: {recipe.course}</span>
            <span>Dificultad: {recipe.difficulty}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## Valores Válidos para Course

Según los datos actuales, los valores válidos para `course` son:

- `"Principal"` - Platos principales
- `"Entrante"` - Entrantes
- `"Postre"` - Postres
- `"Sopa"` - Sopas
- `"Desayuno"` - Desayunos

## Valores Válidos para Cuisine

Los valores válidos para `cuisine` incluyen:

- `"Italiana"`
- `"Española"`
- `"Mediterranea"`
- `"Asiatica"`
- `"Fusion"`
- `"Internacional"`
- `"Francesa"`
- `"Desayuno"`
- `"Postre"`

---

## Comparación: GET /recipes vs GET /search/recipes

| Característica | GET /recipes | GET /search/recipes |
|----------------|-------------|---------------------|
| **Base de Datos** | MongoDB | Elasticsearch |
| **Filtro `cuisine`** | ✅ Sí | ✅ Sí |
| **Filtro `course`** | ✅ Sí | ✅ Sí |
| **Filtro `difficulty`** | ✅ Sí | ✅ Sí |
| **Filtro `tags`** | ✅ Sí | ✅ Sí |
| **Filtro `ingredients`** | ✅ Sí (como `ingredient`) | ✅ Sí (como `ingredients`) |
| **Búsqueda de Texto** | ✅ Básica (`q`) | ✅ Avanzada con autocompletado |
| **Highlights** | ❌ No | ✅ Sí |
| **Agregaciones** | ❌ No | ✅ Sí |
| **Performance** | Buena para listados | Óptima para búsquedas complejas |
| **Recomendado para** | Listados, filtros simples | Búsquedas avanzadas, autocompletado |

---

## URLs de Ejemplo Completas

### MongoDB Endpoint
```
GET /recipes?cuisine=Italiana&course=Principal&difficulty=easy&maxTime=45&size=20
```

### Elasticsearch Endpoint
```
GET /search/recipes?q=pasta&cuisine=Italiana&course=Principal&ingredients=ajo,tomate&size=20
```

---

## Notas Importantes

1. **Case Sensitivity**: Los filtros `cuisine` y `course` son case-insensitive (no importan mayúsculas/minúsculas) gracias al uso de `RegExp` con flag `'i'`.

2. **Múltiples Valores**: 
   - `tags` y `ingredients` aceptan múltiples valores separados por comas: `?tags=pasta,vegetariano`
   - `difficulty` en Elasticsearch también acepta múltiples valores: `?difficulty=easy,medium`

3. **Paginación**: 
   - Usa `from` para el offset (ej: `from=0` para primera página, `from=20` para segunda)
   - Usa `size` para el número de resultados (máximo 100)

4. **Búsqueda de Texto**: 
   - En `/recipes` usa búsqueda de texto básica de MongoDB
   - En `/search/recipes` usa búsqueda avanzada con autocompletado y highlights

---

## Ejemplo Completo: Filtro Dinámico con React

```jsx
import React, { useState, useEffect } from 'react';

const RecipeBrowser = () => {
  const [filters, setFilters] = useState({
    cuisine: '',
    course: '',
    difficulty: '',
    q: ''
  });
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      try {
        const response = await fetch(`/recipes?${params.toString()}`);
        const data = await response.json();
        setRecipes(data.results);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [filters]);

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar recetas..."
          value={filters.q}
          onChange={(e) => setFilters({ ...filters, q: e.target.value })}
        />
        
        <select
          value={filters.cuisine}
          onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
        >
          <option value="">Todas las cocinas</option>
          <option value="Italiana">Italiana</option>
          <option value="Española">Española</option>
          <option value="Mediterranea">Mediterránea</option>
        </select>

        <select
          value={filters.course}
          onChange={(e) => setFilters({ ...filters, course: e.target.value })}
        >
          <option value="">Todos los platos</option>
          <option value="Principal">Principal</option>
          <option value="Entrante">Entrante</option>
          <option value="Postre">Postre</option>
        </select>

        <select
          value={filters.difficulty}
          onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
        >
          <option value="">Todas</option>
          <option value="easy">Fácil</option>
          <option value="medium">Media</option>
          <option value="hard">Difícil</option>
        </select>
      </div>

      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div className="recipes-grid">
          {recipes.map(recipe => (
            <div key={recipe._id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <div className="meta">
                <span>🍳 {recipe.cuisine}</span>
                <span>🍽️ {recipe.course}</span>
                <span>⭐ {recipe.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeBrowser;
```

---

## Resumen

✅ **Sí, puedes filtrar por `course` y `cuisine` desde el frontend** usando:

- **GET /recipes?course=Principal&cuisine=Italiana** (MongoDB)
- **GET /search/recipes?course=Principal&cuisine=Italiana** (Elasticsearch)

Ambos endpoints ahora soportan el filtro `course` además de `cuisine`, permitiendo combinaciones como:
- Recetas italianas que sean platos principales
- Postres de cualquier cocina
- Sopas mediterráneas
- Etc.

