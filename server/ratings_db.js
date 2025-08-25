const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, 'data', 'ratings.db');

// Create/connect to database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to ratings database');
    createTables();
  }
});

// Create tables if they don't exist
function createTables() {
  const createRatingsTable = `
    CREATE TABLE IF NOT EXISTS ratings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER NOT NULL,
      user_name TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK (rating >= 0 AND rating <= 5),
      review_text TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.run(createRatingsTable, (err) => {
    if (err) {
      console.error('Error creating ratings table:', err.message);
    } else {
      console.log('Ratings table ready');
    }
  });
}

// Save a new rating
function saveRating(projectId, userName, rating, reviewText = null) {
  return new Promise((resolve, reject) => {
    // For text-only reviews (rating = 0), ensure there's review text
    if (rating === 0 && (!reviewText || reviewText.trim().length === 0)) {
      reject(new Error('Review text is required for text-only reviews'));
      return;
    }
    
    const sql = `
      INSERT INTO ratings (project_id, user_name, rating, review_text, timestamp)
      VALUES (?, ?, ?, ?, datetime('now'))
    `;
    
    db.run(sql, [projectId, userName, rating, reviewText], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          id: this.lastID,
          projectId,
          userName,
          rating,
          reviewText,
          timestamp: new Date().toISOString()
        });
      }
    });
  });
}

// Get all ratings for a specific project
function getProjectRatings(projectId) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM ratings 
      WHERE project_id = ? 
      ORDER BY timestamp DESC
    `;
    
    db.all(sql, [projectId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Get average rating for a project
function getProjectAverageRating(projectId) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT AVG(rating) as average_rating, COUNT(*) as total_ratings
      FROM ratings 
      WHERE project_id = ?
    `;
    
    db.get(sql, [projectId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          averageRating: row.average_rating || 0,
          totalRatings: row.total_ratings || 0
        });
      }
    });
  });
}

// Get all ratings across all projects
function getAllRatings() {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT r.*, p.description as project_description
      FROM ratings r
      LEFT JOIN (
        SELECT 1 as project_id, 'Eco-Friendly Energy Model' as description
        UNION SELECT 2, 'Smart Waste Management'
        UNION SELECT 3, 'AI-Powered Waste Sorting'
        UNION SELECT 4, 'Renewable Energy Plant'
        UNION SELECT 5, 'Low-Cost Water Purifier'
        UNION SELECT 6, 'Mushroom-Based Soil Restoration'
        UNION SELECT 7, 'Automated Recycling Robot'
        UNION SELECT 8, 'Bee & Organic Farming'
        UNION SELECT 9, 'Marine Plastic Cleaner'
        UNION SELECT 10, 'AI-Based Traffic Management'
        UNION SELECT 11, 'Lotus Leaf Self-Cleaning Surface'
      ) p ON r.project_id = p.project_id
      ORDER BY r.timestamp DESC
    `;
    
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Delete a rating (for admin purposes)
function deleteRating(ratingId) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM ratings WHERE id = ?';
    
    db.run(sql, [ratingId], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ deletedRows: this.changes });
      }
    });
  });
}

// Close database connection
function closeDatabase() {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed');
    }
  });
}

module.exports = {
  saveRating,
  getProjectRatings,
  getProjectAverageRating,
  getAllRatings,
  deleteRating,
  closeDatabase
};
