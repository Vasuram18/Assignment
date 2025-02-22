from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load the model and vectorizer
model = joblib.load('conspiracy_model.pkl')
vectorizer = joblib.load('tfidf_vectorizer.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    headline = data.get('headline')
    if not headline:
        return jsonify({'error': 'Headline is required'}), 400

    # Preprocess and predict
    X = vectorizer.transform([headline])
    score = model.predict(X)[0]
    category = "Conspiracy" if score > 70 else "Clickbait" if score > 40 else "Legitimate"
    return jsonify({'headline': headline, 'score': int(score), 'category': category})

if __name__ == '__main__':
    app.run(port=5000)