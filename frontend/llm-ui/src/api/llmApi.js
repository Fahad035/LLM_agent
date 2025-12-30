const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function generateResponse(prompt) {
  const start = performance.now();

  const res = await fetch(`${API_BASE_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API Error");
  }

  const data = await res.json();
  const latency = Math.round(performance.now() - start);

  return {
    data,
    latency,
  };
}


// {
//   "rewrites": [
//     { "source": "/(.*)", "destination": "/" }
//   ],
//   "framework": "vite",
//   "buildCommand": "npm run build",
//   "outputDirectory": "dist"
// }