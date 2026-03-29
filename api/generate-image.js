export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { imagePrompt } = req.body;

  if (!imagePrompt) {
    return res.status(400).json({ error: 'Missing imagePrompt' });
  }

  const safePrompt = `Children's picture book illustration, Pixar-style 3D render, vibrant warm colors, expressive characters, detailed background, cinematic lighting, no text, no words, safe for kids: ${String(imagePrompt).slice(0, 400)}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt: safePrompt }],
          parameters: {
            sampleCount: 1,
            aspectRatio: '4:3',
            safetySetting: 'block_low_and_above',
            personGeneration: 'allow_adult',
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API error:', errText);
      return res.status(500).json({ error: 'Image generation failed', imageUrl: null });
    }

    const data = await response.json();
    const base64 = data?.predictions?.[0]?.bytesBase64Encoded;

    if (!base64) {
      return res.status(500).json({ error: 'No image returned', imageUrl: null });
    }

    return res.status(200).json({ imageUrl: `data:image/png;base64,${base64}` });
  } catch (err) {
    console.error('generate-image error:', err);
    return res.status(500).json({ error: 'Image generation failed', imageUrl: null });
  }
}
