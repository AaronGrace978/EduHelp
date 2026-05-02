@echo off
setlocal enabledelayedexpansion
title EduHelp — create release ZIP

cd /d "%~dp0"

if not exist "node_modules" (
  echo  [!] Run setup.bat first to install dependencies.
  pause
  exit /b 1
)

echo.
echo  Building production bundle + standalone folder...
echo.

call npm run release:bundle
if errorlevel 1 (
  echo.
  echo  [!] Build or packaging failed.
  pause
  exit /b 1
)

for /f "usebackq tokens=*" %%i in (`node -p "require('./package.json').version"`) do set "VER=%%i"
set "OUTDIR=dist"
set "ZIP=%OUTDIR%\EduHelp-standalone-v!VER!.zip"

if not exist "%OUTDIR%" mkdir "%OUTDIR%"
if exist "!ZIP!" del /f /q "!ZIP!"

echo.
echo  Zipping .next\standalone ^(!VER!^)...
powershell -NoProfile -Command "Compress-Archive -Path (Join-Path '%CD%' '.next\standalone\*') -DestinationPath '%CD%\!ZIP!' -Force"

if errorlevel 1 (
  echo  [!] Failed to create ZIP.
  pause
  exit /b 1
)

echo.
echo  ================================================================
echo   Done:  !ZIP!
echo   Share this file — recipient needs Node.js 20+ only.
echo   They unzip, read HOW-TO-RUN.txt, then:  node server.js
echo  ================================================================
echo.
explorer /select,"!ZIP!"
pause
endlocal
