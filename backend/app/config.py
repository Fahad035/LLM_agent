import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # ... other settings
    MODEL_NAME = "gemini-1.5-flash" 

settings = Settings()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables")
