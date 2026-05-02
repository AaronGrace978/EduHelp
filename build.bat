@echo off
setlocal
title EduHelp - Production build

cd /d "%~dp0"

if not exist "node_modules" (
  echo  [!] Dependencies not installed yet. Run setup.bat first.
  echo.
  pause
  exit /b 1
)

echo.
echo  Building EduHelp for production...
echo.

call npm run build
if errorlevel 1 (
  echo.
  echo  [!] Build failed. Scroll up for the error.
  pause
  exit /b 1
)

echo.
echo  ================================================
echo   Build complete.  Run start.bat to serve it.
echo  ================================================
echo.
pause
endlocal
