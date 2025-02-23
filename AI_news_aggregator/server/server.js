const express = require('express');
const cors = require('cors');
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
    // Check if the headline already exists in the database
    const checkQuery = 'SELECT * FROM headlines WHERE headline = $1';
    const { rows: existingRows } = await db.query(checkQuery, [headline]);

    if (existingRows.length > 0) {
      // If the headline already exists, return the existing data
      return res.json({
        score: existingRows[0].score,
        category: existingRows[0].category,
        message: 'Headline already exists',
      });
    }

    // Call Python API for prediction (if headline is new)
    const response = await axios.post('http://localhost:5000/predict', { headline });
    const { score, category } = response.data;

    // Save to PostgreSQL (only if headline is new)
    const insertQuery = 'INSERT INTO headlines (headline, score, category) VALUES ($1, $2, $3) RETURNING *';
    const values = [headline, score, category];
    const dbResponse = await db.query(insertQuery, values);

    res.json({ score, category, message: 'Headline added successfully' });
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

// Endpoint to fetch a single headline by ID
app.get('/headlines/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM headlines WHERE id = $1';
    const { rows } = await db.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Headline not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch headline' });
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

// Endpoint to update a headline
app.put('/headlines/:id', async (req, res) => {
  const { id } = req.params;
  const { headline, score, category } = req.body;

  if (!headline || !score || !category) {
    return res.status(400).json({ error: 'Headline, score, and category are required' });
  }

  try {
    const query = `
      UPDATE headlines
      SET headline = $1, score = $2, category = $3
      WHERE id = $4
      RETURNING *
    `;
    const values = [headline, score, category, id];
    const { rows } = await db.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Headline not found' });
    }

    res.json({ message: 'Headline updated successfully', data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update headline' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Node.js server running on http://localhost:${PORT}`);
});