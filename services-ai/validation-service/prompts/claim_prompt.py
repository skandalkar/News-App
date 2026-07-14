"""
Prompt Template
Extract factual claims from a news article.
Expected Output
[
    {
        "claim": "...",
        "type": "...",
        "importance": "High"
    }
]

"""
CLAIM_EXTRACTION_PROMPT = """
You are an experienced investigative journalist.
Your task is to extract ONLY factual claims from the article.

Rules:

1. Ignore opinions.
2. Ignore assumptions.
3. Ignore predictions.
4. Ignore advertisements.
5. Ignore emotional statements.

Return ONLY valid JSON.
Output format
[
    {
        "claim":"...",
        "type":"Person | Event | Organization | Statistic | Location | Government | Economy | Technology | Health | Politics | Sports | Crime | Other",
        "importance":"High | Medium | Low"
    }
]
Article
{text}
"""