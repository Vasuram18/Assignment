
# AI-Powered News Aggregator

## 📚 Project Overview
This project is an AI-powered news aggregator that classifies news headlines into three categories: **Conspiracy**, **Clickbait**, or **Legitimate** based on a classification score. It uses a Flask-based Python API for NLP tasks and a Node.js + Express backend with a PostgreSQL database for storage and full CRUD operations.

## 💡 Approach
1. **Frontend:** A simple HTML/CSS/JavaScript interface for users to submit headlines.
2. **Backend (Node.js/Express):** 
   - Handles API requests for headline prediction and CRUD operations.
   - Calls the Python API for score prediction and category classification.
   - Stores headlines in PostgreSQL, checking for duplicates before insertion.
3. **NLP Component (Python/Flask):** 
   - Uses a trained model with TF-IDF vectorization to classify headlines.
   - Returns score and category based on classification thresholds.

## 🔧 Installation and Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Vasuram18/Assignment.git
cd AI_news_aggregator
```

### 2️⃣ Database Setup
1. Ensure PostgreSQL is installed and running.  
2. Create a database named `news_aggregator`.  
3. Import the provided SQL dump:
   ```bash
   psql -U postgres -d news_aggregator -f news_aggregator.sql
   ```

### 3️⃣ Environment Variables
Modify `.env` file in the **server** directory with the your credentials:
```env
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_db_name
```
The `db.js` file will read from this `.env` for database configurations.

### 4️⃣ Server Setup
```bash
cd server
npm install express cors pg axios dotenv
node server.js
```
Server will run at: [http://localhost:3000](http://localhost:3000)

### 5️⃣ Python NLP API Setup
```bash
cd nlp
pip install flask joblib pandas scikit-learn
python api.py
```
Python API will run at: [http://localhost:5000](http://localhost:5000)

### 6 . open the index.html in client folder with live server or manually by double clicking it in directory

## 🔗 API Endpoints

### 🌟 **POST** `/predict`
- **Description:** Predicts the score and category of a headline.
- **Request Body:**
  ```json
  { "headline": "Sample news headline" }
  ```
- **Response:**
  ```json
  { "score": 65, "category": "Clickbait", "message": "Headline added successfully" }
  ```

### 📋 **GET** `/headlines`
- **Description:** Fetches all headlines from the database.
- **Response:** JSON array of headlines.

### 🔍 **GET** `/headlines/:id`
- **Description:** Fetches a single headline by its ID.

### 📝 **PUT** `/headlines/:id`
- **Description:** Updates headline, score, and category.
- **Request Body:**
  ```json
  { "headline": "Updated headline", "score": 80, "category": "Conspiracy" }
  ```

### 🗑️ **DELETE** `/headlines/:id`
- **Description:** Deletes a headline by ID.

## ⚡ Key Features
- Full CRUD functionality for headlines.
- Handles duplicate headline checks before insertion.
- NLP-based classification using TF-IDF vectorizer and trained model.
- Environment-variable driven database configuration.

## ✍️ Notes for Evaluator
- Run `server.js` and `api.py` simultaneously.
- PostgreSQL database is required with the provided SQL dump.
- `.env` file configuration is essential for database connectivity.

---

