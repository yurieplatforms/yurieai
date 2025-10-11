import 'dotenv/config';
import express from "express";
import cors from "cors";
import { randomUUID } from 'node:crypto';
import { fetch } from 'undici';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

// Create a ChatKit session and return the client secret to the frontend
app.post("/api/chatkit/session", async (req, res) => {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  const workflowId = process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID;
  if (!openaiApiKey || !workflowId) {
    return res.status(500).json({
      error: "Missing OPENAI_API_KEY or OPENAI_CHATKIT_WORKFLOW_ID in environment",
    });
  }

  try {
    const deviceId = (req.body?.deviceId as string | undefined)?.trim();
    const userId = deviceId && deviceId.length > 0 ? deviceId : randomUUID();

    const response = await fetch("https://api.openai.com/v1/chatkit/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "OpenAI-Beta": "chatkit_beta=v1",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        workflow: { id: workflowId },
        user: userId,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(502).json({ error: "OpenAI ChatKit error", details: text });
    }

    const json = await response.json();
    const clientSecret = json?.client_secret as string | undefined;
    if (!clientSecret) {
      return res.status(500).json({ error: "client_secret missing in response" });
    }

    return res.json({ client_secret: clientSecret });
  } catch (err) {
    return res.status(500).json({ error: "Failed to create session" });
  }
});

const port = process.env.PORT || 5174;
app.listen(port, () => console.log(`Backend on ${port}`));
