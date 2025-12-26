const API_URL = "https://YOUR-CLOUD-RUN-URL/generate";

export async function callLLM(prompt) {
  const start = performance.now();

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const latency = performance.now() - start;

  const data = await response.json();

  if (!response.ok) {
    throw {
      message: data.detail || "LLM Error",
      latency,
    };
  }

  return {
    data,
    latency,
  };
}
