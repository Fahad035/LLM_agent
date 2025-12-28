import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    ENV = os.getenv("ENV", "development")
    DD_SERVICE = os.getenv("DD_SERVICE", "llm-backend")
    DD_ENV = os.getenv("DD_ENV", "production")

settings = Settings()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables")
