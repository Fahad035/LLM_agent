from datadog import DogStatsd
import os

statsd = DogStatsd(
    host=os.getenv("DD_AGENT_HOST", "localhost"),
    port=8125
)

def record_llm_request(prompt_length: int):
    statsd.increment(
        "llm.requests.count",
        tags=["service:llm-api"]
    )

    statsd.histogram(
        "llm.prompt.length",
        prompt_length,
        tags=["service:llm-api"]
    )


def record_llm_response(response_length: int, latency_ms: float):
    statsd.histogram(
        "llm.response.length",
        response_length,
        tags=["service:llm-api"]
    )

    statsd.histogram(
        "llm.latency.ms",
        latency_ms,
        tags=["service:llm-api"]
    )


def record_llm_error(error_type: str):
    statsd.increment(
        "llm.errors.count",
        tags=[f"error:{error_type}", "service:llm-api"]
    )
