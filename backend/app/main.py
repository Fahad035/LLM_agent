from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
from ddtrace import patch_all

from app.schemas import PromptRequest
from app.llm import generate_response

# Enable Datadog auto-instrumentation
patch_all()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="LLM Observability API")

# ✅ CORS (IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://llm-agent-chi-six.vercel.app"],  # replace with Vercel domain later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate")
def generate(prompt_request: PromptRequest):
    logger.info(
        "LLM request received",
        extra={"prompt_length": len(prompt_request.prompt)}
    )

    result = generate_response(prompt_request.prompt)

    return {
        "response": result["text"],
        "latency": result["latency_ms"],
        "tokens": result["tokens"],
        "cost": result["cost"],
        "model": result["model"]
    }
