from datadog import initialize, DogStatsd
import os

statsd = DogStatsd(
    host=os.getenv("DD_AGENT_HOST", "localhost"),
    port=8125
)

options = {
    "api_key": os.getenv("DD_API_KEY"),
    "site": os.getenv("DD_SITE", "datadoghq.com"),
}

initialize(**options)

def record_llm_metrics(model: str, latency: float, tokens: int):
    statsd.increment("llm.request.count", tags=[f"model:{model}"])
    statsd.timing("llm.response.latency", latency, tags=[f"model:{model}"])
    statsd.gauge("llm.tokens.used", tokens, tags=[f"model:{model}"])