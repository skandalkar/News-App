"""
Version 3
Computes confidence score using
Source Score
Evidence Match
Entity Match
Keyword Match
LLM Agreement
instead of asking the LLM
to invent a confidence.
"""

class ScoringService:

    @staticmethod
    def calculate(source_score, evidence_matches, keyword_matches, entity_matches):

        confidence = (
            source_score * 0.30
            + evidence_matches * 0.40
            + keyword_matches * 0.20
            + entity_matches * 0.10
        )

        return round(confidence, 2)
