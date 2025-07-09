''' 
            This is a monolithic AI Sumarization service to provide quick summary about the news based on the title of the article or headline, if the user wants to read complete news, user can read from original source by clicking to news.
'''

import os
import time
from flask import Flask, request, jsonify, Response
from transformers.pipelines import pipeline
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Load the summarization pipeline
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

@app.route('/summarize', methods=['POST'])
def summarize_text():
    if not request.json or 'text' not in request.json:
        return jsonify({'error': 'Missing "text" in request body'}), 400

    text = request.json['text']
    
    if not isinstance(text, str) or not text.strip():
        return jsonify({'error': '"text" must be a non-empty string'}), 400
    
    # Artificial delay to simulate long-running process
    for _ in range(5):  # 5 x 100ms = 0.5s
        time.sleep(0.1)
        if request.environ.get('werkzeug.socket') is None:  # client likely disconnected
            print("Client disconnected before processing started.")
            return Response(status=499)  # 499 = Client Closed Request

    try:
        summary = summarizer(text, max_length=150, min_length=100, do_sample=False)
        return jsonify({"summary": summary[0]["summary_text"]}) 
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('SUMMARY_PORT', 5001))
    app.run(debug=True, port=port)
