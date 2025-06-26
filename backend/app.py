from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

DEMO_EMAIL = "demo@eventpal.com"
DEMO_PASSWORD = "password123"

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    if email == DEMO_EMAIL and password == DEMO_PASSWORD:
        return jsonify({"success": True})
    else:
        return jsonify({"success": False}), 401

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    # For demo: accept any signup, but you can add logic to check if user exists
    if email and password:
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "message": "Invalid input"}), 400

if __name__ == "__main__":
    app.run(debug=True)

