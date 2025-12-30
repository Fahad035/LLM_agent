import requests
import os
import time

DD_API_KEY = os.getenv("DD_API_KEY")
DD_SITE = os.getenv("DD_SITE", "datadoghq.com")

def record_llm_metrics(model: str, latency: float, tokens: int):
    if not DD_API_KEY:
        return

    payload = {
        "series": [
            {
                "metric": "llm.request.count",
                "points": [[int(time.time()), 1]],
                "tags": [f"model:{model}"],
                "type": "count"
            },
            {
                "metric": "llm.response.latency",
                "points": [[int(time.time()), latency * 1000]],
                "tags": [f"model:{model}"],
                "type": "gauge"
            },
            {
                "metric": "llm.tokens.used",
                "points": [[int(time.time()), tokens]],
                "tags": [f"model:{model}"],
                "type": "gauge"
            }
        ]
    }

    requests.post(
        f"https://api.{DD_SITE}/api/v1/series",
        headers={
            "Content-Type": "application/json",
            "DD-API-KEY": DD_API_KEY,
        },
        json=payload,
        timeout=2
    )
