# Script para iniciar el sistema CookingMama
# Uso: .\iniciar.ps1

# Configurar codificación UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "Iniciando sistema CookingMama..." -ForegroundColor Green
Write-Host ""

# Verificar que Docker está corriendo
try {
    docker ps | Out-Null
} catch {
    Write-Host "[ERROR] Docker no esta corriendo. Por favor, inicia Docker Desktop." -ForegroundColor Red
    exit 1
}

Write-Host "[OK] Docker esta corriendo" -ForegroundColor Green
Write-Host ""

# Iniciar todos los servicios
Write-Host "Iniciando contenedores..." -ForegroundColor Yellow
docker-compose up -d

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Error al iniciar los contenedores" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Esperando a que los servicios esten listos (30 segundos)..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

Write-Host ""
Write-Host "Verificando estado de los servicios..." -ForegroundColor Yellow
docker-compose ps

Write-Host ""
Write-Host "Verificando salud de la API..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri http://localhost:3000/health -Method Get -ErrorAction Stop
    Write-Host "[OK] API esta funcionando correctamente" -ForegroundColor Green
    Write-Host "   MongoDB: $($health.mongo)" -ForegroundColor Cyan
    Write-Host "   Elasticsearch: $($health.elastic.cluster) - v$($health.elastic.version)" -ForegroundColor Cyan
} catch {
    Write-Host "[ADVERTENCIA] La API aun no esta lista. Espera unos segundos mas y verifica con:" -ForegroundColor Yellow
    Write-Host "   Invoke-RestMethod -Uri http://localhost:3000/health -Method Get" -ForegroundColor Gray
}

Write-Host ""
Write-Host "[OK] Sistema iniciado correctamente!" -ForegroundColor Green
Write-Host ""
Write-Host "Servicios disponibles:" -ForegroundColor Cyan
Write-Host "   - API: http://localhost:3000" -ForegroundColor White
Write-Host "   - Kibana: http://localhost:5601" -ForegroundColor White
Write-Host "   - Elasticsearch: http://localhost:9200" -ForegroundColor White
Write-Host "   - MongoDB: localhost:27017" -ForegroundColor White
Write-Host ""
Write-Host "Para ver los logs: docker-compose logs -f" -ForegroundColor Gray
Write-Host "Para detener: docker-compose down" -ForegroundColor Gray
Write-Host ""
