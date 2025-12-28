from ddtrace import tracer
from datadog import statsd
from app.config import GEMINI_API_KEY
import anthropic

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