import time
import anthropic
from app.metrics import record_llm_metrics

def generate_response(prompt: str):
    start_time = time.time()

    client = anthropic.Anthropic()

    response = client.messages.create(
        model="claude-3-sonnet-20240229",
        max_tokens=300,
        messages=[{"role": "user", "content": prompt}]
    )

    latency = time.time() - start_time
    tokens = response.usage.input_tokens + response.usage.output_tokens
    cost = round(tokens * 0.000003, 6)  # approx cost

    record_llm_metrics(
        model="claude-3-sonnet",
        latency=latency,
        tokens=tokens
    )

    return {
        "text": response.content[0].text,
        "latency_ms": int(latency * 1000),
        "tokens": tokens,
        "cost": cost,
        "model": "claude-3-sonnet"
    }
