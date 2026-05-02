@echo off
setlocal
title EduHelp - Setup

echo.
echo  ================================================
echo   EduHelp - first-time setup
echo  ================================================
echo.

cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo  [!] Node.js is not installed or not on PATH.
  echo      Download the LTS from https://nodejs.org and re-run this script.
  echo.
  pause
  exit /b 1
)

echo  Node version:
node --version
echo  npm  version:
call npm --version
echo.

if not exist ".env.local" (
  if exist ".env.example" (
    echo  Creating .env.local from .env.example...
    copy /y ".env.example" ".env.local" >nul
    echo  [ok] .env.local created. Open it later to add API keys (optional).
  )
) else (
  echo  [skip] .env.local already exists.
)
echo.

echo  Installing dependencies (this can take a minute)...
call npm install --no-fund --no-audit
if errorlevel 1 (
  echo.
  echo  [!] npm install failed. Scroll up for the error.
  pause
  exit /b 1
)

echo.
echo  ================================================
echo   Setup complete.
echo.
echo   Next:  double-click  dev.bat   to start the app
echo                       build.bat  to build for production
echo  ================================================
echo.
pause
endlocal
