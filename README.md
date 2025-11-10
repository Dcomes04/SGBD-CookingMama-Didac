# CookingMama API - Sistema de Gestión de Productos

Sistema completo de gestión de productos con MongoDB, Elasticsearch y sincronización en tiempo real.

## 🚀 Inicio Rápido

### Opción 1: Usar los scripts (Recomendado)

**Para iniciar todo:**
```powershell
.\iniciar.ps1
```

**Para detener todo:**
```powershell
.\detener.ps1
```

**Para ver el estado:**
```powershell
.\estado.ps1
```

### Opción 2: Usar Docker Compose directamente

**Iniciar:**
```powershell
docker-compose up -d
```

**Detener:**
```powershell
docker-compose down
```

## 📚 Documentación Completa

Para una guía detallada con todos los comandos y solución de problemas, consulta el archivo **[GUIA.md](./GUIA.md)**.

## 🏗️ Arquitectura

- **API REST**: Node.js + Express (Puerto 3000)
- **Base de Datos**: MongoDB con Replica Set (Puerto 27017)
- **Motor de Búsqueda**: Elasticsearch (Puerto 9200)
- **Sincronización**: Monstache (MongoDB → Elasticsearch)
- **Dashboard**: Kibana (Puerto 5601)

## 🔗 Endpoints Principales

- `GET /health` - Estado del sistema
- `POST /products` - Crear producto
- `GET /products/:id` - Obtener producto
- `PATCH /products/:id` - Actualizar producto
- `DELETE /products/:id` - Eliminar producto
- `GET /search?q=...&brand=...&minPrice=...&maxPrice=...` - Buscar productos

## 📖 Ejemplo de Uso

```powershell
# Crear un producto
$body = @{
    name = "Laptop"
    brand = "Dell"
    price = 999
    tags = @("electronics", "computers")
} | ConvertTo-Json -Depth 1

Invoke-RestMethod -Uri http://localhost:3000/products -Method Post -Body $body -ContentType "application/json"

# Buscar productos
Invoke-RestMethod -Uri "http://localhost:3000/search?q=laptop&brand=Dell" -Method Get
```

## 📝 Notas

- La primera vez puede tardar varios minutos en descargar las imágenes de Docker
- Espera 30-60 segundos después de iniciar para que todos los servicios estén listos
- Los datos se guardan en volúmenes de Docker y persisten entre reinicios

## 🆘 Ayuda

Consulta **[GUIA.md](./GUIA.md)** para:
- Solución de problemas
- Comandos útiles
- Detalles de configuración
- Ejemplos completos

