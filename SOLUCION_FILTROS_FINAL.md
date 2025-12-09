# Solución Final: Filtros de Cuisine y Course

## Estado Actual

El backend ha sido corregido para usar `cuisine` en lugar de `cuisine.keyword`. El código local está correcto, pero necesitamos verificar que el container tiene la versión actualizada.

## Verificación del Filtro

### Test 1: Verificar que el filtro funciona

Haz una petición y revisa los resultados:

```bash
# Con filtro
curl "http://localhost:3000/search/recipes?cuisine=Italiana&size=5"

# Sin filtro
curl "http://localhost:3000/search/recipes?size=5"
```

**Compara:**
- ¿El número de resultados es diferente?
- ¿Con el filtro solo retorna recetas con `cuisine: "Italiana"`?
- ¿Sin el filtro retorna recetas de diferentes cuisines?

### Test 2: Verificar los logs

Después de hacer una petición con filtro, revisa los logs:

```bash
docker-compose logs api --tail 20
```

**Busca:**
- `🔍 Filtering by cuisine: Italiana` - Debe aparecer
- `"cuisine": "Italiana"` en la query (NO `"cuisine.keyword"`)

## Si el Filtro NO Funciona

Si el filtro no funciona (retorna todas las recetas), el problema es que el container aún tiene código antiguo.

**Solución:**
```bash
docker-compose stop api
docker-compose rm -f api
docker-compose build --no-cache api
docker-compose up -d api
```

Espera unos segundos y prueba de nuevo.

## Si el Filtro SÍ Funciona pero el Frontend no Muestra Resultados

Si el backend retorna resultados correctamente pero el frontend no los muestra, el problema es del frontend.

### Posibles Problemas del Frontend:

1. **Formato de Respuesta Diferente**
   - El backend retorna: `{ hits: [...], total: {...}, aggregations: {...} }`
   - El frontend puede estar esperando: `{ results: [...], total: ... }`

2. **Estructura de los Resultados**
   - El backend retorna: `hits[]._source` (los datos están en `_source`)
   - El frontend puede estar accediendo directamente a `hits[]`

3. **Procesamiento de la Respuesta**
   - Verifica cómo el frontend procesa la respuesta
   - Puede que necesite mapear `hits` a `results` o extraer `_source`

### Solución: Adaptar el Backend al Frontend

Si el frontend espera un formato diferente, podemos modificar la respuesta del backend:

```javascript
// En api/src/index.js, línea ~715
res.json({
  hits: r.hits.hits,
  total: r.hits.total,
  aggregations: r.aggregations
});
```

Podríamos cambiarlo a:

```javascript
res.json({
  results: r.hits.hits.map(hit => hit._source), // Extraer _source
  total: r.hits.total.value || r.hits.total,
  aggregations: r.aggregations
});
```

O mantener ambos formatos:

```javascript
res.json({
  hits: r.hits.hits,
  results: r.hits.hits.map(hit => hit._source), // Para compatibilidad
  total: r.hits.total.value || r.hits.total,
  aggregations: r.aggregations
});
```

## Verificar el Problema del Frontend

Para verificar si el problema es del frontend:

1. **Abre las DevTools del navegador** (F12)
2. **Ve a la pestaña Network**
3. **Haz una búsqueda con filtro**
4. **Revisa la petición y respuesta:**
   - ¿Qué URL está llamando?
   - ¿Qué parámetros está enviando?
   - ¿Qué respuesta está recibiendo?
   - ¿Hay algún error en la consola?

5. **Revisa el código del frontend:**
   - ¿Cómo está procesando la respuesta?
   - ¿Está accediendo a `hits` o a `results`?
   - ¿Está extrayendo `_source` de cada hit?

## Ejemplo de Respuesta del Backend

```json
{
  "hits": [
    {
      "_index": "recipes",
      "_id": "...",
      "_score": 1,
      "_source": {
        "title": "Espagueti al pomodoro",
        "cuisine": "Italiana",
        "course": "Principal",
        ...
      }
    }
  ],
  "total": {
    "value": 5,
    "relation": "eq"
  },
  "aggregations": {...}
}
```

## Si el Frontend Espera Este Formato:

```json
{
  "results": [
    {
      "title": "Espagueti al pomodoro",
      "cuisine": "Italiana",
      "course": "Principal",
      ...
    }
  ],
  "total": 5
}
```

Entonces necesitamos modificar el backend para adaptar la respuesta.

## Próximos Pasos

1. **Verifica si el filtro funciona** haciendo los tests arriba
2. **Revisa los logs** para confirmar que usa `cuisine` (no `cuisine.keyword`)
3. **Si el filtro funciona pero el frontend no muestra resultados**, comparte:
   - Cómo el frontend está procesando la respuesta
   - Qué formato espera el frontend
   - Cualquier error en la consola del navegador

Con esta información podré ayudarte a adaptar el backend al frontend o corregir el frontend según sea necesario.

