@echo off
setlocal
title EduHelp - Dev server

cd /d "%~dp0"

if not exist "node_modules" (
  echo  [!] Dependencies not installed yet. Run setup.bat first.
  echo.
  pause
  exit /b 1
)

if not exist ".env.local" (
  if exist ".env.example" (
    echo  Creating .env.local from .env.example...
    copy /y ".env.example" ".env.local" >nul
  )
)

echo.
echo  ================================================
echo   EduHelp dev server starting...
echo   Open http://localhost:3000 in your browser.
echo   Press Ctrl+C to stop.
echo  ================================================
echo.

start "" http://localhost:3000

call npm run dev

endlocal
