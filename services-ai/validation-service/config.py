import os
from dotenv import load_dotenv
load_dotenv()

class Config:
    OLLAMA_URL = os.getenv( "OLLAMA_URL", "http://localhost:11434/api/generate" )
    OLLAMA_MODEL = os.getenv( "OLLAMA_MODEL", "qwen3:0.6b" )
    REQUEST_TIMEOUT = int( os.getenv( "REQUEST_TIMEOUT", "60" ))
    MAX_ARTICLE_LENGTH = int( os.getenv( "MAX_ARTICLE_LENGTH", "20000" ))