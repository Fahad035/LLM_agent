from ddtrace import tracer
from datadog import statsd
from app.metrics import record_llm_metrics
from app.config import GEMINI_API_KEY
import anthropic
import time

def generate_response(prompt: str):

    client = anthropic.Anthropic()
    response = client.models.generate_content(
        model="models/gemini-1.5-flash",
        contents=prompt
    )

    token_count = len(prompt.split())  # simple approximation

    statsd.gauge(
        "llm.tokens.used",
        token_count,
        tags=["service:llm-observability-api"]
    )

    return response.text

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

    record_llm_metrics("claude-3-sonnet", latency, tokens)

    return response.content[0].text