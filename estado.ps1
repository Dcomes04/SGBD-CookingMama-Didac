# Script para verificar el estado del sistema CookingMama
# Uso: .\estado.ps1

# Configurar codificación UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "Estado del Sistema CookingMama" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Verificar Docker
try {
    docker ps | Out-Null
    Write-Host "[OK] Docker esta corriendo" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Docker no esta corriendo" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Estado de los contenedores:" -ForegroundColor Yellow
docker-compose ps

Write-Host ""
Write-Host "Estado de la API:" -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri http://localhost:3000/health -Method Get -ErrorAction Stop
    Write-Host "[OK] API esta funcionando" -ForegroundColor Green
    Write-Host "   MongoDB: $($health.mongo)" -ForegroundColor White
    Write-Host "   Elasticsearch: $($health.elastic.cluster) - v$($health.elastic.version)" -ForegroundColor White
} catch {
    Write-Host "[ERROR] API no responde" -ForegroundColor Red
    Write-Host "   Error: $_" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Estadisticas de Elasticsearch:" -ForegroundColor Yellow
try {
    $count = Invoke-RestMethod -Uri http://localhost:9200/products/_count -Method Get -ErrorAction Stop
    Write-Host "   Productos indexados: $($count.count)" -ForegroundColor White
} catch {
    Write-Host "   No se pudo obtener el conteo de productos" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Logs recientes de Monstache (ultimas 5 lineas):" -ForegroundColor Yellow
docker-compose logs --tail=5 monstache 2>&1 | Select-Object -Last 5

Write-Host ""
