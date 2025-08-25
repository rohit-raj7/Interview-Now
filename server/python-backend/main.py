 

from flask import Flask, request, jsonify
from flask_cors import CORS


# Import your utility functions
from utils.parser import extract_text_from_resume
from utils.keyword_extractor import extract_keywords_and_questions

app = Flask(__name__)
CORS(app)  # Allow requests from other origins (e.g., frontend)

# Root route - browser friendly
@app.route('/')
def home():
    return "✅ Flask backend is running!"
 
# GET route example
@app.route('/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello from Python Flask!"})

# POST route for uploading resume and extracting info
@app.route('/upload', methods=['POST'])
def upload_resume():
    if 'resume' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['resume']
    text = extract_text_from_resume(file)

    # extract_keywords_and_questions() returns a dictionary
    data = extract_keywords_and_questions(text)

    return jsonify({
        "keywords": data["keywords"],
        "technical_questions": data["technical_questions"],
        "hr_questions": data["hr_questions"],
        "managerial_questions": data["managerial_questions"],
        "text_preview": text[:800]  # limit preview
    })



# POST route for extracting keywords from raw text
@app.route('/keywords', methods=['POST']) 
def extract_keywords():
    data = request.get_json()
    text = data.get('text', '')
    keywords = list(set(text.lower().split()))
    return jsonify({"keywords": keywords}) 

if __name__ == '__main__':
    # 0.0.0.0 allows access from other machines; good for frontend/backend setup
    app.run(debug=True, host='0.0.0.0', port=5000)
 