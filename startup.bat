@echo off
REM Change to your desired directory path
cd /d "C:\SoftwareSystem\PCM_QUOTATION"

REM Set PowerShell execution policy and run npm commands
powershell -Command "Set-ExecutionPolicy RemoteSigned -Scope CurrentUser"

REM Run npm start
echo Starting the application...
start /B cmd /c "npm run start"

REM Wait a bit longer for the server to start (15 seconds instead of 5)
echo Waiting for server to start...
timeout /t 15

REM Try to open the browser
echo Opening browser...
start "" "http://localhost:5173"

REM Pause to keep the window open
echo If the browser didn't open, try visiting http://localhost:5173 manually
pause