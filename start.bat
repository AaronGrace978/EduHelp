@echo off
setlocal
title EduHelp - Production server

cd /d "%~dp0"

if not exist ".next" (
  echo  [!] No production build found. Running build first...
  call build.bat
  if errorlevel 1 exit /b 1
)

echo.
echo  ================================================
echo   EduHelp production server starting...
echo   Open http://localhost:3000 in your browser.
echo   Press Ctrl+C to stop.
echo  ================================================
echo.

start "" http://localhost:3000

call npm run start

endlocal
