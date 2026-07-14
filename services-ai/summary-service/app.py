from flask import Flask
from config import Config
from routes.summary import summary_bp

app = Flask(__name__)

app.register_blueprint(summary_bp)

if __name__ == "__main__":

    app.run(port=5001, debug=True)