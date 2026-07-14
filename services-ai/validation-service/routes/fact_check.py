from flask import Blueprint
from flask import jsonify
from flask import request
from utils.validator import validate_request
from utils.validator import validate_url

from services.claim_extractor import ClaimExtractor
from services.keyword_extractor import KeywordExtractor
from services.credibility_service import CredibilityService

fact_check_bp = Blueprint("fact_check", __name__)

# Main Fact-check and Validation Route
@fact_check_bp.route("/fact-check", methods=["POST"])

def fact_check():
    data = request.get_json()
    valid, error = validate_request(data)

    if not valid:
        return jsonify({"error": error}), 400

    article = data["text"]
    url = data.get("url")
    source = data.get("source") or {}
    if not url and isinstance(source, dict):
        url = source.get("url")

    domain = validate_url(url)
    credibility = CredibilityService().analyze(domain)

    try:
        claims = ClaimExtractor.extract(article)
        keywords = KeywordExtractor.extract(article)

        return jsonify(
            {
                "status": "success",
                "claims": claims,
                "keywords": keywords["keywords"],
                "source": credibility,
            }
        )

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
