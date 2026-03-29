export async function generateImage(imagePrompt) {
  const res = await fetch('/api/generate-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imagePrompt }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.imageUrl || null;
}
