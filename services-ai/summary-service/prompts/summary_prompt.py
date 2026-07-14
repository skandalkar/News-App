SUMMARY_PROMPT = """
You are an experienced news editor.

Summarize the following news article.

Rules:

1. Maximum 150 words.
2. Neutral tone.
3. Preserve facts.
4. No opinions.
5. No hallucinations.
6. Mention important names, organizations, locations and dates.

Article:

{text}
"""