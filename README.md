Yurie ChatKit App

A Vite + React frontend with an Express backend that embeds OpenAI ChatKit and connects to an Agent Builder workflow.

Setup
-----

1) Install dependencies:

```bash
cd app/frontend && npm i && cd ../backend && npm i
```

2) Configure environment:

```bash
cd app/backend
cp .env.example .env
# Edit .env with your keys
# OPENAI_API_KEY=sk-...
# NEXT_PUBLIC_CHATKIT_WORKFLOW_ID=wf_...
```

3) Run dev servers (two terminals):

```bash
cd app/backend && npm run dev
```

```bash
cd app/frontend && npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5174

Notes
-----
- The frontend calls `POST /api/chatkit/session` to obtain a `client_secret` for ChatKit.
- Vite proxies `/api` to the backend.
- Theme defaults to system preference, with dark mode and custom accent.

Vercel
------
- Deploy this repo root (`app/`).
- Set environment variables in Vercel project:
  - `OPENAI_API_KEY`
  - `NEXT_PUBLIC_CHATKIT_WORKFLOW_ID`
- Vercel will build `frontend` via `vercel-build` and serve static files; API routes under `frontend/api/*` will run as serverless functions.

