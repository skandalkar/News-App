from prompts.keyword_prompt import KEYWORD_EXTRACTION_PROMPT
from services.llm_reason_service import LLMService
from utils.response_parser import parse_json_response


class KeywordExtractor:

    @staticmethod
    def extract(article: str):
        prompt = KEYWORD_EXTRACTION_PROMPT.replace("{text}", article)
        response = LLMService.generate(prompt)

        parsed = parse_json_response(response)

        if parsed is None:
            return {"keywords": []}

        return parsed
