import time
import google.generativeai as genai
from app.config import GEMINI_API_KEY
import logging

logger = logging.getLogger(__name__)

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-pro")

def generate_response(prompt: str) -> str:
    start_time = time.time()

    try:
        response = model.generate_content(prompt)
        text = response.text

        latency_ms = int((time.time() - start_time) * 1000)

        logger.info(
            "LLM response generated",
            extra={
                "latency_ms": latency_ms,
                "prompt_length": len(prompt),
            },
        )

        return text

    except Exception as e:
        logger.error(f"Gemini error: {str(e)}")
        raise
