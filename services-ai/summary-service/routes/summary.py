from flask import Blueprint
from flask import jsonify

try:
    from flask_cors import CORS
except ImportError:
    CORS = None
    
from flask import request
from services.ollama_service import OllamaService
from utils.validator import validate_request

summary_bp = Blueprint("summary", __name__)

if CORS:
    CORS(summary_bp)

@summary_bp.route("/summarize", methods=["POST"])
def summarize():
    valid, error = validate_request(request.get_json())

    if not valid:
        return jsonify({"error": error}), 400
    text = request.json["text"]

    try:
        summary = OllamaService.summarize(text)
        return jsonify({"summary": summary})

    except Exception as e:
        return jsonify({"error": str(e)}), 500