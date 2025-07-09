import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

@app.route('/fact-check', methods=['POST'])
def fact_check_text():
    """
    Placeholder for fact-checking logic.
    Expects a JSON payload with a "text" key.
    """
    if not request.json or 'text' not in request.json:
        return jsonify({'error': 'Missing "text" in request body'}), 400

    text = request.json['text']
    
    if not isinstance(text, str) or not text.strip():
        return jsonify({'error': '"text" must be a non-empty string'}), 400

    # Placeholder for fact-checking logic
    return jsonify({'status': 'Fact-checking not yet implemented'})

if __name__ == '__main__':
    port = int(os.environ.get('FACTCHECK_PORT', 5002))
    app.run(debug=True, port=port)