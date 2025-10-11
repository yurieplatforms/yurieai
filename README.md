Yurie ChatKit App (Next.js)

Next.js app embedding OpenAI ChatKit and calling a serverless API route for session tokens.

Setup
-----

1) Install dependencies:

```bash
cd app
npm i
```

2) Configure environment:

```bash
cp .env.example .env.local
# Edit .env.local with your keys
# OPENAI_API_KEY=sk-...
# NEXT_PUBLIC_CHATKIT_WORKFLOW_ID=wf_...
```

3) Run dev server:

```bash
npm run dev
```

- App: http://localhost:3000

Notes
-----
- API route: `app/api/chatkit/session/route.ts` (POST) returns a ChatKit `client_secret`.
- UI: `app/page.tsx` mounts ChatKit and applies theme options.
- Favicon: place `public/favicon.ico`.

