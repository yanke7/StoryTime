import 'dotenv/config';
import express from 'express';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Dynamically load and call each API handler
async function loadHandler(name) {
  const mod = await import(`./api/${name}.js`);
  return mod.default;
}

app.post('/api/generate-story-start', async (req, res) => {
  const handler = await loadHandler('generate-story-start');
  handler(req, res);
});

app.post('/api/generate-story-continue', async (req, res) => {
  const handler = await loadHandler('generate-story-continue');
  handler(req, res);
});

app.post('/api/generate-image', async (req, res) => {
  const handler = await loadHandler('generate-image');
  handler(req, res);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`));
