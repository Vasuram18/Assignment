const express = require('express');
const cors = require('cors'); // Import the cors package
const db = require('./db');
const axios = require('axios');
const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Endpoint to calculate score and category
app.post('/predict', async (req, res) => {
  const { headline } = req.body;
  if (!headline) {
    return res.status(400).json({ error: 'Headline is required' });
  }

  try {
    // Call Python API for prediction
    const response = await axios.post('http://localhost:5000/predict', { headline });
    const { score, category } = response.data;

    // Save to PostgreSQL
    const query = 'INSERT INTO headlines (headline, score, category) VALUES ($1, $2, $3) RETURNING *';
    const values = [headline, score, category];
    const dbResponse = await db.query(query, values);

    res.json({ score, category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process headline' });
  }
});

// Endpoint to fetch all headlines
app.get('/headlines', async (req, res) => {
  try {
    const query = 'SELECT * FROM headlines';
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch headlines' });
  }
});

// Endpoint to delete a headline
app.delete('/headlines/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM headlines WHERE id = $1';
    await db.query(query, [id]);
    res.json({ message: 'Headline deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete headline' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Node.js server running on http://localhost:${PORT}`);
});