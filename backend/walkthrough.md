# RAG AI Portfolio Assistant — Walkthrough

I have successfully built and integrated the complete AI assistant architecture into your portfolio, strictly adhering to your requirement to keep it entirely separate in a `backend/` directory like a professional codebase!

## What was built:

### 1. Isolated Backend (`backend/`)
- **Independent Node.js Server:** Created a `server.js` running Express on port `3001` with CORS and Rate Limiting (`10 req/min`) built-in.
- **Dynamic Knowledge Base:** Created `backend/data/`. I added a sample `about.md` for you to see. **You can now drop any `.md` file into this folder to train your AI.**
- **Local Embedding Script (`scripts/embed.js`):** Run this script anytime you add new Markdown files. It automatically reads your `data/` folder, splits the text intelligently, and uses the `@xenova/transformers` library to build local vector embeddings without relying on any external database.
- **Retrieval Logic (`lib/retrieve.js`):** Highly optimized math functions to compute cosine similarities between the user's chat query and your embedded markdown chunks.
- **Groq Integration (`routes/chat.js`):** Takes the closest matching chunks and feeds them strictly into the `llama-3.3-70b-versatile` model with a strong system prompt, ensuring the bot *only* answers based on the context.

### 2. Frontend Chat Widget (`src/components/ChatWidget.tsx`)
- A beautiful, fully animated floating action button positioned in the bottom-right of your site.
- Expands into a sleek chat interface matching your dark/blue theme.
- Features loading states, auto-scrolling, and error handling.
- Successfully wired into `App.tsx` and visible across the entire site.

### 3. Integrated Dev Environment
- I updated the main `package.json` with the `concurrently` package. Now, running `npm run dev` automatically spins up **both** your Vite React frontend and the Express backend simultaneously!

## How to use it:

> [!IMPORTANT]
> **Step 1: Set up your API Key**
> Go into the `backend/` folder and create a `.env` file (or copy `.env.example`). Add your key like this:
> `GROQ_API_KEY=your_actual_key_here`

> [!TIP]
> **Step 2: Add your content**
> Start creating Markdown files (like `resume.md`, `projects.md`) inside the `backend/data/` folder with all your portfolio information.

> [!IMPORTANT]
> **Step 3: Generate the brain**
> Open a terminal in the `backend/` folder and run:
> `node scripts/embed.js`
> This will generate the `embeddings.json` file. You must run this command *every time* you edit or add a markdown file!

> [!TIP]
> **Step 4: Restart your server**
> Restart your `npm run dev` command in the root folder so the backend spins up with the frontend, and you can chat with your assistant in the UI!
