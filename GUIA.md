# Guía de Uso - CookingMama API

Esta guía te ayudará a desplegar y usar el sistema completo cuando enciendas tu ordenador.

## 📋 Requisitos Previos

- Docker Desktop instalado y corriendo
- Docker Compose instalado (viene con Docker Desktop)

## 🚀 Iniciar el Sistema

### Paso 1: Abrir la terminal en la carpeta del proyecto

```powershell
cd "C:\Users\ikerr\Code\SGBD\PRACTICA FINAL 2.0\SGBD-CookingMama"
```

### Paso 2: Iniciar todos los servicios

```powershell
docker-compose up -d
```

Este comando iniciará:
- **MongoDB** (puerto 27017)
- **Elasticsearch** (puerto 9200)
- **Kibana** (puerto 5601)
- **Monstache** (sincronización MongoDB → Elasticsearch)
- **API** (puerto 3000)

### Paso 3: Verificar que todo está corriendo

```powershell
docker-compose ps
```

Deberías ver todos los servicios con estado "Up".

### Paso 4: Esperar a que todo esté listo (30-60 segundos)

Los servicios necesitan tiempo para:
- MongoDB: Inicializar el replica set
- Elasticsearch: Iniciar el cluster
- Monstache: Conectarse y comenzar la sincronización
- API: Conectarse a MongoDB y Elasticsearch

### Paso 5: Verificar el estado de la API

```powershell
Invoke-RestMethod -Uri http://localhost:3000/health -Method Get
```

Deberías recibir una respuesta JSON indicando que MongoDB y Elasticsearch están conectados.

### Paso 6: Ver los logs (opcional)

Para ver los logs de todos los servicios:
```powershell
docker-compose logs -f
```

Para ver logs de un servicio específico:
```powershell
# Logs de la API
docker-compose logs -f api

# Logs de Monstache
docker-compose logs -f monstache

# Logs de MongoDB
docker-compose logs -f mongo
```

## ✅ Verificar que Todo Funciona

### 1. Probar la creación de un producto

```powershell
$body = @{
    name = "Producto de Prueba"
    brand = "Marca Test"
    price = 99.99
    tags = @("test", "ejemplo")
    description = "Este es un producto de prueba"
} | ConvertTo-Json -Depth 1

Invoke-RestMethod -Uri http://localhost:3000/products -Method Post -Body $body -ContentType "application/json"
```

### 2. Buscar el producto (esperar 2 segundos para la sincronización)

```powershell
Start-Sleep -Seconds 2
Invoke-RestMethod -Uri "http://localhost:3000/search?q=prueba&refresh=true" -Method Get
```

### 3. Filtrar por marca

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/search?brand=Marca Test" -Method Get
```

## 📚 Endpoints Disponibles

### Health Check
```powershell
Invoke-RestMethod -Uri http://localhost:3000/health -Method Get
```

### Crear Producto
```powershell
$body = @{ name = "Nombre"; brand = "Marca"; price = 100; tags = @("tag1") } | ConvertTo-Json -Depth 1
Invoke-RestMethod -Uri http://localhost:3000/products -Method Post -Body $body -ContentType "application/json"
```

### Obtener Producto por ID
```powershell
Invoke-RestMethod -Uri http://localhost:3000/products/ID_DEL_PRODUCTO -Method Get
```

### Actualizar Producto
```powershell
$body = @{ price = 150 } | ConvertTo-Json -Depth 1
Invoke-RestMethod -Uri http://localhost:3000/products/ID_DEL_PRODUCTO -Method Patch -Body $body -ContentType "application/json"
```

### Eliminar Producto
```powershell
Invoke-RestMethod -Uri http://localhost:3000/products/ID_DEL_PRODUCTO -Method Delete
```

### Buscar Productos
```powershell
# Búsqueda simple
Invoke-RestMethod -Uri "http://localhost:3000/search?q=laptop" -Method Get

# Búsqueda con filtros
Invoke-RestMethod -Uri "http://localhost:3000/search?q=laptop&brand=Dell&minPrice=500&maxPrice=1000" -Method Get

# Con refresh (resultados inmediatos)
Invoke-RestMethod -Uri "http://localhost:3000/search?q=laptop&refresh=true" -Method Get
```

**Parámetros de búsqueda:**
- `q`: Texto a buscar (name, description, tags)
- `brand`: Filtrar por marca exacta
- `minPrice`: Precio mínimo
- `maxPrice`: Precio máximo
- `from`: Paginación - índice inicial (default: 0)
- `size`: Cantidad de resultados (default: 10)
- `refresh`: Forzar refresh del índice (`true`/`false`)

## 🛑 Detener el Sistema

### Opción 1: Detener todos los servicios (recomendado)

```powershell
docker-compose down
```

Esto detendrá todos los contenedores pero **mantendrá los datos** en los volúmenes de Docker.

### Opción 2: Detener y eliminar volúmenes (elimina datos)

⚠️ **CUIDADO**: Esto eliminará todos los datos almacenados en MongoDB y Elasticsearch.

```powershell
docker-compose down -v
```

### Opción 3: Detener sin eliminar contenedores

```powershell
docker-compose stop
```

Para reiniciar después:
```powershell
docker-compose start
```

## 🔧 Comandos Útiles

### Ver estado de los contenedores
```powershell
docker-compose ps
```

### Ver logs en tiempo real
```powershell
docker-compose logs -f
```

### Reiniciar un servicio específico
```powershell
docker-compose restart api
docker-compose restart monstache
```

### Reconstruir la API (después de cambios en el código)
```powershell
docker-compose up -d --build api
```

### Verificar conexión a MongoDB
```powershell
docker exec mongo mongosh --eval "rs.status()" --quiet
```

### Verificar índice en Elasticsearch
```powershell
Invoke-RestMethod -Uri http://localhost:9200/products/_count -Method Get
```

### Ver todos los índices en Elasticsearch
```powershell
Invoke-RestMethod -Uri http://localhost:9200/_cat/indices?v -Method Get
```

## 🐛 Solución de Problemas

### La API no responde
1. Verificar que el contenedor está corriendo:
   ```powershell
   docker-compose ps
   ```
2. Ver los logs:
   ```powershell
   docker-compose logs api
   ```
3. Reiniciar el servicio:
   ```powershell
   docker-compose restart api
   ```

### Monstache no sincroniza
1. Verificar que MongoDB tiene replica set activo:
   ```powershell
   docker exec mongo mongosh --eval "rs.status()" --quiet
   ```
2. Ver logs de Monstache:
   ```powershell
   docker-compose logs monstache
   ```
3. Reiniciar Monstache:
   ```powershell
   docker-compose restart monstache
   ```

### Los productos no aparecen en búsquedas
1. Verificar que Monstache está corriendo:
   ```powershell
   docker-compose ps monstache
   ```
2. Forzar refresh en la búsqueda:
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:3000/search?q=producto&refresh=true" -Method Get
   ```
3. Esperar 1-2 segundos después de crear un producto antes de buscarlo.

### Error al iniciar servicios
1. Verificar que Docker Desktop está corriendo
2. Verificar que los puertos no están en uso:
   - 3000 (API)
   - 27017 (MongoDB)
   - 9200 (Elasticsearch)
   - 5601 (Kibana)
3. Detener todo y volver a iniciar:
   ```powershell
   docker-compose down
   docker-compose up -d
   ```

## 📊 Acceder a las Interfaces Web

- **API**: http://localhost:3000
- **Kibana** (dashboard de Elasticsearch): http://localhost:5601
- **Elasticsearch**: http://localhost:9200

### Verificar Elasticsearch directamente
```powershell
Invoke-RestMethod -Uri http://localhost:9200 -Method Get
```

## 🔄 Resumen Rápido

### Para empezar a trabajar:
```powershell
cd "C:\Users\ikerr\Code\SGBD\PRACTICA FINAL 2.0\SGBD-CookingMama"
docker-compose up -d
Start-Sleep -Seconds 30
Invoke-RestMethod -Uri http://localhost:3000/health -Method Get
```

### Para terminar y apagar todo:
```powershell
docker-compose down
```

### Para limpiar completamente (eliminar datos):
```powershell
docker-compose down -v
```

## 📝 Notas Importantes

1. **Primera vez**: La primera vez que ejecutes `docker-compose up -d`, puede tardar varios minutos en descargar las imágenes.

2. **Sincronización**: Monstache sincroniza automáticamente los cambios de MongoDB a Elasticsearch. Hay un pequeño delay (~1 segundo) antes de que los nuevos productos sean buscables.

3. **Datos persistentes**: Los datos se guardan en volúmenes de Docker, por lo que sobreviven a reinicios del sistema si usas `docker-compose down` (sin `-v`).

4. **Puertos**: Si algún puerto está en uso, puedes cambiarlo en el archivo `docker-compose.yml`.

5. **Logs**: Si algo no funciona, revisa siempre los logs primero con `docker-compose logs [servicio]`.

