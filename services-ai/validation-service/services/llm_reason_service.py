import requests
from config import Config

class LLMService:

    @staticmethod
    def generate(prompt: str):
        if Config.OLLAMA_URL.rstrip("/").endswith("/api/chat"):
            payload = {
                "model": Config.OLLAMA_MODEL,
                "messages": [{"role": "user", "content": prompt}],
                "stream": False,
                "options": {"temperature": 0.2, "num_predict": 512},
            }
        else:
            payload = {
                "model": Config.OLLAMA_MODEL,
                "prompt": prompt,
                "stream": False,
                "options": {"temperature": 0.2, "num_predict": 512},
            }

        response = requests.post(
            Config.OLLAMA_URL, json=payload, timeout=Config.REQUEST_TIMEOUT
        )

        response.raise_for_status()
        data = response.json()

        if "response" in data:
            return data["response"]

        message = data.get("message")
        if isinstance(message, dict) and "content" in message:
            return message["content"]

        raise ValueError("Ollama response did not include generated text.")
