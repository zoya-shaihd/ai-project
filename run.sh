#!/bin/bash

# AI Startup Builder - Dev Server
echo "==================================================="
echo "             AI STARTUP BUILDER"
echo "==================================================="
echo

# 1. Verify Node.js installation
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed or not in your PATH."
    echo "Please install Node.js from https://nodejs.org/ and try again."
    echo
    exit 1
fi

# 2. Setup Environment File (.env.local)
if [ ! -f .env.local ]; then
    echo "[INFO] .env.local not found. Copying from .env.example..."
    cp .env.example .env.local
elif [ ! -s .env.local ]; then
    echo "[INFO] .env.local is empty. Copying from .env.example..."
    cp .env.example .env.local
fi

# 3. Check for GEMINI_API_KEY configuration
if grep -q 'GEMINI_API_KEY="MY_GEMINI_API_KEY"' .env.local; then
    echo "[WARNING] GEMINI_API_KEY is still set to the default placeholder in .env.local."
    echo "          The application will fallback to the Smart Offline Generator."
    echo "          To enable live AI generation, please edit .env.local and add your key."
    echo
fi

# 4. Install Dependencies
if [ ! -d node_modules ]; then
    echo "[INFO] First time run: Installing dependencies. This may take a minute..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] npm install failed. Please check the logs."
        exit 1
    fi
fi

# 5. Launch the Web Browser
echo "[INFO] Starting the development server..."
echo "[INFO] Opening browser at http://localhost:3000 ..."

# Open browser based on OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    (sleep 3 && open http://localhost:3000) &
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    (sleep 3 && xdg-open http://localhost:3000) &
fi

# 6. Start the Server
npm run dev
