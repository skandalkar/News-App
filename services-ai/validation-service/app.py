"""
Fact Validation Service
This microservice validates news articles by:
1. Extracting factual claims
2. Extracting important keywords
3. Checking source credibility
4. (Future) Comparing claims with evidence
"""
import os
from flask import Flask
from dotenv import load_dotenv
from routes.fact_check import fact_check_bp

load_dotenv()

app = Flask(__name__)
app.register_blueprint(fact_check_bp)

# Home Route for Validation-Service
@app.route("/")
def home():
    return {
        "service": "Fact Validation Service",
        "status": "Running",
        "model": os.getenv("OLLAMA_MODEL")
    }

if __name__ == "__main__":
    port = int(os.getenv("FACT_CHECK_PORT", 5002))
    app.run( debug=True, port=port )