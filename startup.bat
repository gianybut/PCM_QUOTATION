@echo off
cd /d "%~dp0"

REM Create/update Windows Desktop shortcut (.lnk launcher)
powershell -Command "$WshShell = New-Object -ComObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut([System.IO.Path]::Combine([Environment]::GetFolderPath('Desktop'), 'PCM Quotation System.lnk')); $Shortcut.TargetPath = 'wscript.exe'; $Shortcut.Arguments = '\"%~dp0startup_background.vbs\"'; $Shortcut.WorkingDirectory = '%~dp0'; $Shortcut.IconLocation = '%~dp0pcm_icon.ico'; $Shortcut.Save()" >nul 2>&1

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

REM Run the browser opener in the background (waits 5 seconds before launching browser)
start /B cmd /c "ping 127.0.0.1 -n 6 >nul && start http://localhost:5173"

REM Run npm start in the foreground so Ctrl+C stops it cleanly
call npm run start