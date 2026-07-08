@echo off
cd /d "%~dp0"

echo ==================================================
echo         Stopping PCM Quotation System            
echo ==================================================
echo.

echo Finding and stopping background processes on ports 5173 and 6942...
powershell -Command "Get-NetTCPConnection -LocalPort 5173, 6942 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess | Unique | ForEach-Object { Stop-Process -Id $_ -Force }"

echo.
echo PCM Quotation System has been stopped.
timeout /t 3
