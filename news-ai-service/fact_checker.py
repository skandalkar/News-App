import os
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

API_KEY = os.getenv('GOOGLE_FACTCHECK_API_KEY')
if not API_KEY:
    raise ValueError("GOOGLE_FACT_API_KEY is missing. Check your .env file!")

@app.route('/validate', methods=['POST'])  # http://localhost:5002/validate
def fact_check_text():
    try:
        if not request.is_json:
            print("[ERROR] Request content-type is not JSON.")
            return jsonify({'error': 'Request must be JSON'}), 400

        data = request.get_json()
        print("[DEBUG] Received request body:", data)

        query = data.get("text", "").strip()
        if not query:
            print("[ERROR] Missing or empty 'text' field.")
            return jsonify({'error': 'Missing or empty \"text\" field'}), 400

        print(f"[DEBUG] Sending request to Google Fact Check API for: {query}")

        url = "https://factchecktools.googleapis.com/v1alpha1/claims:search"
        params = {
            "query": query,
            "key": API_KEY
        }

        response = requests.get(url, params=params)
        response.raise_for_status()

        data = response.json()
        print("[DEBUG] API Response:", data)

        if "claims" in data and len(data["claims"]) > 0:
            claim = data["claims"][0]
            claim_review = claim.get("claimReview", [{}])[0]

            return jsonify({
                "status": "success",
                "verdict": claim_review.get("title", "No verdict found."),
                "source": claim_review.get("publisher", {}).get("name", "Unknown"),
                "url": claim_review.get("url", ""),
                "claim": claim.get("text", "No claim text.")
            }), 200

        else:
            return jsonify({
                "status": "no_claim_found",
                "message": "No matching claims found."
            }), 200

    except requests.exceptions.RequestException as e:
        print("[EXCEPTION] Request to Google API failed:", e)
        return jsonify({'error': str(e)}), 500

    except Exception as e:
        print("[EXCEPTION] Internal server error:", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("FACTCHECK_PORT", 5002))
    app.run(debug=True, port=port)
