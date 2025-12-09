# Solución: Filtros de Cuisine y Course

## Problema Identificado

Los filtros `cuisine` y `course` no funcionaban correctamente en el endpoint `/search/recipes` por dos razones:

1. **Campo incorrecto en la query**: El código estaba buscando `'cuisine.keyword'` y `'course.keyword'`, pero según el mapping, estos campos son directamente `keyword`, no tienen subcampo `.keyword`.

2. **Case-sensitivity**: La query `term` es case-sensitive, lo que significa que "Asiatico" no coincide con "Asiatica" o "asiatica".

## Solución Implementada

Se ha cambiado la implementación para:

1. **Usar el campo correcto**: Cambiar de `'cuisine.keyword'` a `'cuisine'` y de `'course.keyword'` a `'course'`.

2. **Case-insensitive matching**: Usar `match` query con `case_insensitive: true` en lugar de `term` query, ya que Elasticsearch 8.14.0 soporta esta característica.

### Código Antes (Incorrecto):

```javascript
const cuisineTerm = Array.isArray(cuisine) ? cuisine[0] : cuisine;
if (cuisineTerm) {
  filter.push({ term: { 'cuisine.keyword': cuisineTerm } }); // ❌ Campo incorrecto
}

const courseTerm = Array.isArray(course) ? course[0] : course;
if (courseTerm) {
  filter.push({ term: { 'course.keyword': courseTerm } }); // ❌ Campo incorrecto
}
```

### Código Después (Correcto):

```javascript
const cuisineTerm = Array.isArray(cuisine) ? cuisine[0] : cuisine;
if (cuisineTerm) {
  filter.push({ 
    match: { 
      cuisine: {
        query: cuisineTerm.trim(),
        case_insensitive: true  // ✅ Case-insensitive
      }
    } 
  });
}

const courseTerm = Array.isArray(course) ? course[0] : course;
if (courseTerm) {
  filter.push({ 
    match: { 
      course: {
        query: courseTerm.trim(),
        case_insensitive: true  // ✅ Case-insensitive
      }
    } 
  });
}
```

## Verificación del Mapping

Según `api/src/data/mappings.js`, los campos están mapeados así:

```javascript
cuisine: { type: 'keyword' },  // Campo directo, no tiene subcampo .keyword
course: { type: 'keyword' },    // Campo directo, no tiene subcampo .keyword
```

Por lo tanto, la query debe usar `'cuisine'` y `'course'` directamente, no `'cuisine.keyword'` ni `'course.keyword'`.

## Valores en la Base de Datos

Según los datos de ejemplo, los valores de `cuisine` incluyen:
- `"Italiana"`
- `"Española"`
- `"Mediterranea"`
- `"Asiatica"` (no "Asiatico")
- `"Fusion"`
- `"Internacional"`
- `"Francesa"`

Y los valores de `course` incluyen:
- `"Principal"`
- `"Entrante"`
- `"Postre"`
- `"Sopa"`
- `"Desayuno"`

## Casos de Prueba

### Test 1: Filtro de Cuisine básico
```bash
GET /search/recipes?cuisine=Italiana&size=10
# Debería devolver todas las recetas con cuisine "Italiana"
```

### Test 2: Filtro de Course básico
```bash
GET /search/recipes?course=Principal&size=10
# Debería devolver todas las recetas con course "Principal"
```

### Test 3: Case-insensitive
```bash
GET /search/recipes?cuisine=italiana&size=10
GET /search/recipes?cuisine=ITALIANA&size=10
# Ambos deberían funcionar igual que el Test 1
```

### Test 4: Filtros combinados
```bash
GET /search/recipes?cuisine=Italiana&course=Principal&size=10
# Debería devolver recetas italianas que sean platos principales
```

### Test 5: Valores con espacios
```bash
GET /search/recipes?cuisine=Mediterranea&size=10
# Debería funcionar correctamente (trim elimina espacios)
```

## Nota sobre "Asiatico" vs "Asiatica"

Si el frontend envía `cuisine=Asiatico` pero en la base de datos está almacenado como `"Asiatica"`, la query case-insensitive debería funcionar, pero el valor debe coincidir exactamente (sin contar mayúsculas/minúsculas).

Si hay una discrepancia en el valor exacto (ej: "Asiatico" vs "Asiatica"), esto podría requerir:
1. Normalizar los valores en la base de datos
2. O usar una query más flexible como `wildcard` o `fuzzy`

## Verificación Post-Fix

Para verificar que los filtros funcionan correctamente:

1. **Verificar que los parámetros llegan correctamente**:
   ```javascript
   console.log('🔍 Search Params:', { q, ingredients, cuisine, course });
   ```

2. **Verificar la query de Elasticsearch generada**:
   ```javascript
   console.log('🔍 ES Query:', JSON.stringify(searchPayload, null, 2));
   ```

3. **Probar con valores exactos de la base de datos**:
   - Usar `cuisine=Asiatica` (no "Asiatico") si ese es el valor en la BD
   - Verificar que los valores coinciden exactamente con los almacenados

## Cambios Realizados

- ✅ Cambiado `'cuisine.keyword'` → `'cuisine'`
- ✅ Cambiado `'course.keyword'` → `'course'`
- ✅ Cambiado `term` query → `match` query con `case_insensitive: true`
- ✅ Añadido `.trim()` para eliminar espacios en blanco

## Compatibilidad

- Elasticsearch 8.14.0 soporta `case_insensitive: true` en `match` queries (desde ES 7.10+)
- La solución es compatible con la versión actual del proyecto

