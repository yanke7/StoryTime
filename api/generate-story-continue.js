import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a creative children's story writer for ages 5-10. Write in simple, vivid, exciting language. Each page is 3-4 short sentences max. Always return exactly valid JSON — nothing else, no markdown fences.

When isEnding is false, return:
{
  "pageText": "...",
  "choices": [
    { "id": "c1", "label": "...", "emoji": "..." },
    { "id": "c2", "label": "...", "emoji": "..." },
    { "id": "c3", "label": "...", "emoji": "..." }
  ],
  "imagePrompt": "...",
  "isEnding": false
}

When isEnding is true (page 6+), return:
{
  "pageText": "...",
  "choices": [],
  "imagePrompt": "...",
  "isEnding": true
}

The "imagePrompt" must describe the SPECIFIC SCENE of this page — what the characters are actively doing right now, their expressions and body language, the exact location, what objects or creatures are nearby, the mood/lighting. Always use the character descriptions provided. Bright warm colors, children's picture book style, no text in the image.

Never include scary, violent, or age-inappropriate content.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { storyHistory, choiceText, heroName, pageNumber, characters } = req.body;

  if (!choiceText || !heroName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sanitizedChoice = String(choiceText).slice(0, 100).replace(/[<>"]/g, '');
  const currentPage = Number(pageNumber) || 2;
  const isEnding = currentPage >= 6;

  const recentHistory = Array.isArray(storyHistory)
    ? storyHistory.slice(-3).map((p, i) => `Page ${i + 1}: ${p.pageText}`).join('\n\n')
    : '';

  const characterLine = characters
    ? `Character appearances (use these consistently in imagePrompt): ${characters}`
    : '';

  const userPrompt = `Continue the story for hero "${heroName}".
${characterLine}

Story so far:
${recentHistory}

The reader chose: "${sanitizedChoice}"

Write page ${currentPage}. ${isEnding ? 'This is the FINAL page — write a satisfying, happy ending. Set isEnding to true and return empty choices array.' : 'Continue the adventure with 3 exciting choices.'}

In imagePrompt, describe exactly what is happening in THIS scene — the characters in action, their facial expressions, the specific environment details, any magical or exciting elements present. Make it vivid and specific to this moment.
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

    return res.status(200).json({ ...pageData, pageNumber: currentPage });
  } catch (err) {
    console.error('generate-story-continue error:', err);
    return res.status(500).json({ error: 'Failed to continue story' });
  }
}
