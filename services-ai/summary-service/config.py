import os
from dotenv import load_dotenv

load_dotenv()

class Config:

    OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434/api/generate")

    OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen3:0.6b")

    SUMMARY_TIMEOUT = int(os.getenv("SUMMARY_TIMEOUT", 60))