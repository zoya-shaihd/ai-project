<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/c10a90fe-f409-43ea-846d-92d61718f391

## Run Locally

**Prerequisites:**  Node.js

### Windows (One-Click Setup)
Simply double-click the **`run.bat`** file in the root directory. 
- It will automatically copy [.env.example](.env.example) to `.env.local` if it's missing or empty.
- It will automatically run `npm install` if dependencies are not installed.
- It will launch the development server and open the app in your default browser at `http://localhost:3000`.

### macOS/Linux (One-Click Setup)
Run the **`run.sh`** script in your terminal:
```bash
chmod +x run.sh && ./run.sh
```
- It will automatically copy [.env.example](.env.example) to `.env.local` if it's missing or empty.
- It will automatically run `npm install` if dependencies are not installed.
- It will launch the development server and open the app in your default browser at `http://localhost:3000`.

### Manual Setup
1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

