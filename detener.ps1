# Script para detener el sistema CookingMama
# Uso: .\detener.ps1

# Configurar codificación UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "Deteniendo sistema CookingMama..." -ForegroundColor Yellow
Write-Host ""

# Verificar que Docker está corriendo
try {
    docker ps | Out-Null
} catch {
    Write-Host "[ERROR] Docker no esta corriendo." -ForegroundColor Red
    exit 1
}

# Mostrar estado actual
Write-Host "Estado actual de los contenedores:" -ForegroundColor Cyan
docker-compose ps

Write-Host ""
$opcion = Read-Host "Deseas eliminar los volumenes (datos)? (s/N)"

if ($opcion -eq "s" -or $opcion -eq "S") {
    Write-Host "[ADVERTENCIA] Eliminando contenedores y volumenes (se perderan los datos)..." -ForegroundColor Red
    docker-compose down -v
    Write-Host "[OK] Contenedores y volumenes eliminados" -ForegroundColor Green
} else {
    Write-Host "Deteniendo contenedores (los datos se mantienen)..." -ForegroundColor Yellow
    docker-compose down
    Write-Host "[OK] Contenedores detenidos. Los datos estan guardados en volumenes." -ForegroundColor Green
}

Write-Host ""
Write-Host "[OK] Sistema detenido correctamente!" -ForegroundColor Green
Write-Host ""
