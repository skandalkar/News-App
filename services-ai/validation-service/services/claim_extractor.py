from prompts.claim_prompt import CLAIM_EXTRACTION_PROMPT
from services.llm_reason_service import LLMService
from utils.response_parser import parse_json_response

class ClaimExtractor:
    """Extracts factual claims from a news article using the local LLM."""

    @staticmethod
    def extract(article: str):
        prompt = CLAIM_EXTRACTION_PROMPT.replace("{text}", article)

        response = LLMService.generate(prompt)
        parsed = parse_json_response(response)

        if parsed is None:
            return [
                {"claim": response.strip(), "type": "Unknown", "importance": "Unknown"}
            ]

        if isinstance(parsed, list):
            return parsed

        return [{"claim": str(parsed), "type": "Unknown", "importance": "Unknown"}]
