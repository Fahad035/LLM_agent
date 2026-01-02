import time
import google.generativeai as genai
from app.config import GEMINI_API_KEY
from app.metrics import record_llm_metrics

# Initialize Gemini
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

def generate_response(prompt: str):
    """
    Generates a response using Gemini and returns a dictionary 
    containing the text and performance metrics.
    """
    start_time = time.time()
    
    try:
        # 1. Call Gemini API
        response = model.generate_content(prompt)
        text_result = response.text
        
        # 2. Calculate Metrics
        latency_ms = int((time.time() - start_time) * 1000)
        # Approximate tokens (1 token ≈ 4 chars or use word split)
        tokens = len(prompt.split()) + len(text_result.split())
        # Gemini 1.5 Flash is ~$0.30 per 1 million tokens
        cost = (tokens / 1_000_000) * 0.30 
        
        # 3. Record to Datadog
        record_llm_metrics("gemini-1.5-flash", latency_ms / 1000, tokens)

        # 4. Return the Dictionary main.py expects
        return {
            "text": text_result,
            "latency_ms": latency_ms,
            "tokens": tokens,
            "cost": round(cost, 6),
            "model": "gemini-1.5-flash"
        }
    except Exception as e:
        # Return a structured error so the backend doesn't crash
        return {
            "text": f"Error: {str(e)}",
            "latency_ms": 0,
            "tokens": 0,
            "cost": 0,
            "model": "error"
        }