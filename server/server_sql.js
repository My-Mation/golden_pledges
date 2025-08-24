const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../')));

// Initialize SQLite database
const dbPath = path.join(__dirname, 'data', 'reviews.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    
    // Create reviews table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      stall_id TEXT NOT NULL,
      reviewer_name TEXT NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) {
        console.error('Error creating reviews table:', err.message);
      } else {
        console.log('Reviews table ready');
      }
    });
  }
});

// Routes

// Get all reviews
app.get('/api/reviews', (req, res) => {
  const sql = 'SELECT id, stall_id AS stallId, reviewer_name AS reviewerName, rating, comment, timestamp FROM reviews ORDER BY timestamp DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch reviews' });
    } else {
      res.json(rows);
    }
  });
});

// Get reviews for a specific stall
app.get('/api/reviews/:stallId', (req, res) => {
  const { stallId } = req.params;
  const sql = 'SELECT id, stall_id AS stallId, reviewer_name AS reviewerName, rating, comment, timestamp FROM reviews WHERE stall_id = ? ORDER BY timestamp DESC';
  db.all(sql, [stallId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch reviews for this stall' });
    } else {
      res.json(rows);
    }
  });
});

// Add a new review
app.post('/api/reviews', (req, res) => {
  const { stallId, reviewerName, rating, comment } = req.body;
  
  // Validation
  if (!stallId || !reviewerName || rating === undefined || !comment) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }
  
  const sql = 'INSERT INTO reviews (stall_id, reviewer_name, rating, comment) VALUES (?, ?, ?, ?)';
  const params = [stallId, reviewerName, parseInt(rating), comment];
  
  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: 'Failed to add review' });
    } else {
      res.status(201).json({
        id: this.lastID,
        stallId: stallId,
        reviewerName: reviewerName,
        rating: parseInt(rating),
        comment: comment,
        timestamp: new Date().toISOString()
      });
    }
  });
});

// Update a review
app.put('/api/reviews/:id', (req, res) => {
  const { id } = req.params;
  const { reviewerName, rating, comment } = req.body;
  
  // Validation
  if (!reviewerName || rating === undefined || !comment) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }
  
  const sql = 'UPDATE reviews SET reviewer_name = ?, rating = ?, comment = ? WHERE id = ?';
  const params = [reviewerName, parseInt(rating), comment, id];
  
  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: 'Failed to update review' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Review not found' });
    } else {
      res.json({
        id: parseInt(id),
        reviewerName: reviewerName,
        rating: parseInt(rating),
        comment: comment
      });
    }
  });
});

// Delete a review
app.delete('/api/reviews/:id', (req, res) => {
  const { id } = req.params;
  
  const sql = 'DELETE FROM reviews WHERE id = ?';
  
  db.run(sql, [id], function(err) {
    if (err) {
      res.status(500).json({ error: 'Failed to delete review' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Review not found' });
    } else {
      res.json({ message: 'Review deleted successfully' });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Gracefully close database connection when server is terminated
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});