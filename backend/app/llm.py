import time
import google.generativeai as genai
from app.config import GEMINI_API_KEY
from app.metrics import record_llm_metrics

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

def generate_response(prompt: str):
    start_time = time.time()
    
    # Call Gemini
    response = model.generate_content(prompt)
    
    latency_ms = int((time.time() - start_time) * 1000)
    text_result = response.text
    
    # Calculate approximate tokens and cost (Gemini 1.5 Flash pricing)
    tokens = len(prompt.split()) + len(text_result.split())
    cost = (tokens / 1_000_000) * 0.30 # Approx $0.30 per million tokens
    
    # Record to Datadog
    record_llm_metrics("gemini-1.5-flash", latency_ms / 1000, tokens)

    # Return the dictionary that your new main.py expects
    return {
        "text": text_result,
        "latency_ms": latency_ms,
        "tokens": tokens,
        "cost": round(cost, 6),
        "model": "gemini-1.5-flash"
    }