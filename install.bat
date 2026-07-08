@echo off
cd /d "%~dp0"

echo ==================================================
echo         PCM Quotation System Installer            
echo ==================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js is not installed on this PC.
    echo Downloading Node.js installer...
    powershell -Command "Invoke-WebRequest -Uri 'https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi' -OutFile 'node_installer.msi'"
    echo Opening Node.js installation wizard...
    start /wait msiexec /i node_installer.msi
    del node_installer.msi
    echo.
    echo Node.js installation finished. 
    echo Please close this window and double-click install.bat again to finish installing the system!
    pause
    exit /b 0
)

echo Node.js is installed.
echo.
echo Installing project dependencies (this may take a minute)...
call npm install
cd backend && call npm install
cd ../frontend && call npm install
cd ..

echo.
echo Creating Desktop shortcut...
if exist "%userprofile%\Desktop\Stop PCM Quotation System.lnk" del "%userprofile%\Desktop\Stop PCM Quotation System.lnk"
powershell -Command "$WshShell = New-Object -ComObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut([System.IO.Path]::Combine([Environment]::GetFolderPath('Desktop'), 'PCM Quotation System.lnk')); $Shortcut.TargetPath = 'wscript.exe'; $Shortcut.Arguments = '\"%~dp0startup_background.vbs\"'; $Shortcut.WorkingDirectory = '%~dp0'; $Shortcut.IconLocation = '%~dp0pcm_icon.ico'; $Shortcut.Save()" >nul 2>&1

echo.
echo ==================================================
echo          Installation Completed Successfully!     
echo ==================================================
echo.
echo Desktop shortcut has been created:
echo "PCM Quotation System" (starts the system in the background)
echo.
echo Note: The system will automatically shut down when you close the browser tab.
echo.
pause
