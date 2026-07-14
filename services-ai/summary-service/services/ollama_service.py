import requests
from config import Config
from prompts.summary_prompt import SUMMARY_PROMPT

class OllamaService:

    @staticmethod
    def summarize(article):

        prompt = SUMMARY_PROMPT.format(text=article)

        response = requests.post(
            Config.OLLAMA_URL,
            json={"model": Config.OLLAMA_MODEL, "prompt": prompt, "stream": False},
            timeout=Config.SUMMARY_TIMEOUT,
        )

        response.raise_for_status()
        data = response.json()
        return data["response"].strip()