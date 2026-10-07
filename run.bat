@echo off
title AI Startup Builder - Dev Server
setlocal enabledelayedexpansion

echo ===================================================
echo             AI STARTUP BUILDER
echo ===================================================
echo.

:: 1. Verify Node.js installation
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in your PATH.
    echo Please install Node.js from https://nodejs.org/ and try again.
    echo.
    pause
    exit /b 1
)

:: 2. Setup Environment File (.env.local)
if not exist .env.local (
    echo [INFO] .env.local not found. Copying from .env.example...
    copy .env.example .env.local >nul
) else (
    for %%I in (.env.local) do if %%~zI==0 (
        echo [INFO] .env.local is empty. Copying from .env.example...
        copy /y .env.example .env.local >nul
    )
)

:: 3. Check for GEMINI_API_KEY configuration
findstr /C:"GEMINI_API_KEY=\"MY_GEMINI_API_KEY\"" .env.local >nul
if %errorlevel% equ 0 (
    echo [WARNING] GEMINI_API_KEY is still set to the default placeholder in .env.local.
    echo           The application will fallback to the Smart Offline Generator.
    echo           To enable live AI generation, please edit .env.local and add your key.
    echo.
)

:: 4. Install Dependencies
if not exist node_modules (
    echo [INFO] First time run: Installing dependencies. This may take a minute...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] npm install failed. Please check the logs.
        pause
        exit /b 1
    )
)

:: 5. Launch the Web Browser
echo [INFO] Starting the development server...
echo [INFO] Opening browser at http://localhost:3000 ...
:: Start background timer to open browser once server initializes
start /B cmd /c "ping 127.0.0.1 -n 4 >nul && start http://localhost:3000"

:: 6. Start the Server
call npm run dev

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Server exited with an error.
    pause
)
