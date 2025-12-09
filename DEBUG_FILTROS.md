# Debug: Filtros de Cuisine y Course

## Pasos para Debug

1. **Reiniciar el container de la API** para que cargue los cambios:
   ```bash
   docker-compose restart api
   ```

2. **Ver los logs en tiempo real**:
   ```bash
   docker-compose logs -f api
   ```

3. **Hacer una petición de prueba**:
   ```bash
   # Desde el navegador o con curl
   http://localhost:3000/search/recipes?cuisine=Italiana&size=10
   ```

4. **Revisar los logs** - Deberías ver:
   - `🔍 All req.query:` - Todos los parámetros recibidos
   - `🔍 Extracted params:` - Parámetros extraídos
   - `🔍 Filtering by cuisine:` - Valor del filtro
   - `📊 Unique cuisines in index:` - Valores únicos en el índice
   - `🔍 ES Query:` - Query completa enviada a Elasticsearch

## Qué buscar en los logs

1. **Si `cuisine` es `undefined`**: El parámetro no está llegando desde el frontend
2. **Si los valores únicos no coinciden**: Hay un problema de case o valores diferentes
3. **Si la query está bien formada**: Verificar que el filtro se está agregando correctamente

## Solución Temporal

Si los filtros siguen sin funcionar, podemos probar:

1. **Verificar valores exactos en Elasticsearch**:
   ```bash
   docker-compose exec es curl -X GET "localhost:9200/recipes/_search?pretty" -H 'Content-Type: application/json' -d'
   {
     "size": 0,
     "aggs": {
       "cuisines": {
         "terms": {
           "field": "cuisine",
           "size": 50
         }
       },
       "courses": {
         "terms": {
           "field": "course",
           "size": 50
         }
       }
     }
   }'
   ```

2. **Probar una búsqueda directa sin filtros**:
   ```bash
   http://localhost:3000/search/recipes?size=10
   ```

3. **Probar con valores exactos de la BD**:
   - Si en la BD hay "Italiana", probar: `?cuisine=Italiana`
   - Si en la BD hay "italiana", probar: `?cuisine=italiana`

