@echo off
cd /d "%~dp0"

echo ==================================================
echo          Starting PCM Quotation System            
echo ==================================================

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed. Please install it first from https://nodejs.org/
    pause
    exit /b 1
)

REM Check and install dependencies if node_modules are missing
echo Checking for missing dependencies...
if not exist "node_modules" (
    echo Root dependencies missing. Installing...
    call npm install
)
if not exist "backend\node_modules" (
    echo Backend dependencies missing. Installing...
    cd backend && call npm install && cd ..
)
if not exist "frontend\node_modules" (
    echo Frontend dependencies missing. Installing...
    cd frontend && call npm install && cd ..
)

REM Kill any leftover Node.js processes from previous sessions on our ports
echo Checking for leftover processes...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":6942 " ^| findstr "LISTENING"') do (
    if not "%%a"=="" taskkill /F /PID %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5173 " ^| findstr "LISTENING"') do (
    if not "%%a"=="" taskkill /F /PID %%a >nul 2>&1
)

REM Create/update Windows Desktop shortcut (.lnk launcher)
powershell -Command "$WshShell = New-Object -ComObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut([System.IO.Path]::Combine([Environment]::GetFolderPath('Desktop'), 'PCM Quotation System.lnk')); $Shortcut.TargetPath = 'wscript.exe'; $Shortcut.Arguments = '\"%~dp0startup_background.vbs\"'; $Shortcut.WorkingDirectory = '%~dp0'; $Shortcut.IconLocation = '%~dp0pcm_icon.ico'; $Shortcut.Save()" >nul 2>&1

REM Run the browser opener in the background (waits for server port 5173 to open)
start /B cmd /c "powershell -Command \"$val = $false; while (!$val) { try { $c = New-Object System.Net.Sockets.TcpClient('127.0.0.1', 5173); $val = $true; $c.Close() } catch { Start-Sleep -Milliseconds 100 } }\" && start http://localhost:5173"

REM Run npm start in the foreground so Ctrl+C stops it cleanly
call npm run start

REM Cleanup after exit — kill any lingering processes on our ports
echo Cleaning up...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":6942 " ^| findstr "LISTENING"') do (
    if not "%%a"=="" taskkill /F /PID %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5173 " ^| findstr "LISTENING"') do (
    if not "%%a"=="" taskkill /F /PID %%a >nul 2>&1
)