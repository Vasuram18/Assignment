import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import joblib
import json

# Load the dataset from a JSON file
with open('news_headlines_large.json', 'r') as file:
    data = json.load(file)

# Convert to DataFrame
df = pd.DataFrame(data['articles'])

# Feature extraction
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df['headline'])
y = df['score']

model = LogisticRegression()
model.fit(X, y)

# Save the model and vectorizer
joblib.dump(model, 'conspiracy_model.pkl')
joblib.dump(vectorizer, 'tfidf_vectorizer.pkl')

print("Model and vectorizer saved!")