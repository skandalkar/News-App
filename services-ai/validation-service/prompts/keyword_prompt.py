"""
Prompt Template
Extract important keywords.
Expected Output
{
    "keywords":[]
}
"""

KEYWORD_EXTRACTION_PROMPT = """
You are an NLP keyword extraction engine.
Extract the most important keywords.
Rules
1. Maximum 10 keywords.
2. Include
    • Person
    • Organization
    • Country
    • City
    • Product
    • Event
    • Technology
    • Company
    • Government Agency
3. Remove duplicate keywords.
4. Keep keywords short.
5. Return JSON only.
Output format
{
    "keywords":[
        "keyword1",
        "keyword2"
    ]
}

Article
{text}
"""
