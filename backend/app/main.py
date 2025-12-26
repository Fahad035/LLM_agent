from fastapi import FastAPI
from schemas import PromptRequest,LLMResponse
from llm import generate_response
import logging
from ddtrace import patch_all


patch_all()  # Enables APM auto-instrumentation

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="LLM Observability API")

@app.post("/generate")
def generate(prompt_request: PromptRequest):
    logger.info(
        "LLM request received",
        extra={"prompt_length": len(prompt_request.prompt)}
    )
    result = generate_response(prompt_request.prompt)
    return {"response": result}

@app.get("/health")
def health():
    return {"status": "ok"}
