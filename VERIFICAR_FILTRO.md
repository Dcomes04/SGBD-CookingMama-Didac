# Verificar si el Filtro Funciona

## Test 1: Con filtro de cuisine
```bash
curl "http://localhost:3000/search/recipes?cuisine=Italiana&size=5"
```

**Revisa:**
- ¿Cuántos resultados retorna?
- ¿Todos tienen `cuisine: "Italiana"`?

## Test 2: Sin filtro
```bash
curl "http://localhost:3000/search/recipes?size=5"
```

**Revisa:**
- ¿Cuántos resultados retorna?
- ¿Hay recetas con diferentes cuisines?

## Test 3: Con filtro de cuisine diferente
```bash
curl "http://localhost:3000/search/recipes?cuisine=Asiatica&size=5"
```

**Revisa:**
- ¿Retorna solo recetas con `cuisine: "Asiatica"`?
- ¿O retorna todas las recetas?

## Si el filtro NO funciona:

El problema es que el código dentro del container aún tiene `cuisine.keyword` en lugar de `cuisine`. 

**Solución:**
1. Verificar que el código local está correcto (ya lo está)
2. Reconstruir el container completamente:
   ```bash
   docker-compose stop api
   docker-compose rm -f api
   docker-compose build --no-cache api
   docker-compose up -d api
   ```

## Si el filtro SÍ funciona pero el frontend no muestra resultados:

El problema puede ser:
1. El frontend no está enviando el parámetro correctamente
2. El frontend no está procesando la respuesta correctamente
3. El frontend está esperando un formato diferente de respuesta

**Verificar en el frontend:**
- ¿Qué URL está llamando exactamente?
- ¿Qué parámetros está enviando?
- ¿Cómo está procesando la respuesta?

