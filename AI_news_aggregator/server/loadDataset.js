

const db = require('./db');
const fs = require('fs');

// Load the dataset
const dataset = JSON.parse(fs.readFileSync('./data/news_headlines_large.json', 'utf8'));

// Insert data into the database
const insertData = async () => {
  try {
    for (const article of dataset.articles) {
      const { headline, category, score } = article;
      const query = `
        INSERT INTO headlines (headline, score, category)
        VALUES ($1, $2, $3)
      `;
      await db.query(query, [headline, score, category]);
    }
    console.log('Dataset inserted successfully!');
  } catch (error) {
    console.error('Error inserting dataset:', error);
  }
};

insertData();