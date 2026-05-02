@echo off
setlocal enabledelayedexpansion
title EduHelp

cd /d "%~dp0"

:menu
cls
echo.
echo  ============================================================
echo                          EduHelp
echo        IEP / 504 Eligibility Navigator (CO + CA)
echo  ============================================================
echo.
echo   1.  First-time setup  (install dependencies)
echo   2.  Start dev server  (http://localhost:3000)
echo   3.  Build for production
echo   4.  Start production server
echo   5.  Open .env.local in Notepad (add API keys)
echo   6.  Open project folder in Explorer
echo   7.  Quit
echo.
set /p choice=  Choose 1-7:  

if "%choice%"=="1" goto setup
if "%choice%"=="2" goto dev
if "%choice%"=="3" goto build
if "%choice%"=="4" goto start
if "%choice%"=="5" goto envedit
if "%choice%"=="6" goto folder
if "%choice%"=="7" goto end

echo  Invalid choice.
timeout /t 1 >nul
goto menu

:setup
call setup.bat
goto menu

:dev
call dev.bat
goto menu

:build
call build.bat
goto menu

:start
call start.bat
goto menu

:envedit
if not exist ".env.local" (
  if exist ".env.example" copy /y ".env.example" ".env.local" >nul
)
notepad ".env.local"
goto menu

:folder
start "" "%~dp0"
goto menu

:end
echo.
echo  Goodbye.
endlocal
exit /b 0
