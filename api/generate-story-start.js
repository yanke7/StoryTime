import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a creative children's story writer for ages 5-10. Write in simple, vivid, exciting language. Each page is 3-4 short sentences max. Always return exactly valid JSON — nothing else, no markdown fences. The JSON must match this shape exactly:
{
  "pageText": "...",
  "choices": [
    { "id": "c1", "label": "...", "emoji": "..." },
    { "id": "c2", "label": "...", "emoji": "..." },
    { "id": "c3", "label": "...", "emoji": "..." }
  ],
  "imagePrompt": "...",
  "characters": "..."
}

The "characters" field is a single sentence describing the visual appearance of the hero and sidekick (hair color, outfit, size, colors) so the same description can be reused in every illustration. Example: "Luna is a small girl with curly red hair and a purple cape; Pepper is a small orange fox with a white-tipped tail."

The "imagePrompt" must describe the SPECIFIC SCENE happening right now in the story — what the characters are doing, their expressions, where they are standing, what surrounds them — as a vivid children's picture book illustration. Always include the character descriptions in the scene. Bright warm colors, no text in the image.

Never include scary, violent, or age-inappropriate content. Keep choices exciting and distinct.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { heroName, adventureType, sidekick, problem } = req.body;

  if (!heroName || !adventureType || !sidekick || !problem) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sanitized = {
    heroName: String(heroName).slice(0, 50).replace(/[<>"']/g, ''),
    adventureType: String(adventureType).slice(0, 30),
    sidekick: String(sidekick).slice(0, 30),
    problem: String(problem).slice(0, 50),
  };

  const userPrompt = `Write page 1 of a choose-your-own-adventure story:
- Hero name: ${sanitized.heroName}
- Setting: ${sanitized.adventureType}
- Sidekick: ${sanitized.sidekick}
- Central problem: ${sanitized.problem}

Invent a fun visual appearance for the hero (hair, outfit, age ~7) and the sidekick. Put their descriptions in "characters". Use those descriptions inside "imagePrompt" to show the specific opening scene.
Return only the JSON object.`;

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 700,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const text = message.content[0].text.trim();
    const pageData = JSON.parse(text);

    return res.status(200).json({ ...pageData, pageNumber: 1, isEnding: false });
  } catch (err) {
    console.error('generate-story-start error:', err);
    return res.status(500).json({ error: 'Failed to generate story' });
  }
}
