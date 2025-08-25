const express = require('express');
const cors = require('cors');
const ratingsDB = require('./ratings_db');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Save a new rating
app.post('/api/ratings', async (req, res) => {
  try {
    const { projectId, userName, rating, reviewText } = req.body;
    
    // Validation
    if (!projectId || !userName || !rating) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (rating < 0 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 0 and 5' });
    }
    
    if (userName.trim().length < 2) {
      return res.status(400).json({ error: 'User name must be at least 2 characters' });
    }
    
    // Save to database
    const savedRating = await ratingsDB.saveRating(projectId, userName, rating, reviewText);
    
    res.json({
      success: true,
      message: 'Rating saved successfully',
      rating: savedRating
    });
    
  } catch (error) {
    console.error('Error saving rating:', error);
    res.status(500).json({ error: 'Failed to save rating' });
  }
});

// Get ratings for a specific project
app.get('/api/ratings/:projectId', async (req, res) => {
  try {
    const projectId = parseInt(req.params.projectId);
    
    if (isNaN(projectId)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }
    
    const ratings = await ratingsDB.getProjectRatings(projectId);
    const averageData = await ratingsDB.getProjectAverageRating(projectId);
    
    res.json({
      success: true,
      ratings: ratings,
      averageRating: averageData.averageRating,
      totalRatings: averageData.totalRatings
    });
    
  } catch (error) {
    console.error('Error getting ratings:', error);
    res.status(500).json({ error: 'Failed to get ratings' });
  }
});

// Get all ratings across all projects
app.get('/api/ratings', async (req, res) => {
  try {
    const ratings = await ratingsDB.getAllRatings();
    
    res.json({
      success: true,
      ratings: ratings
    });
    
  } catch (error) {
    console.error('Error getting all ratings:', error);
    res.status(500).json({ error: 'Failed to get ratings' });
  }
});

// Delete a rating (admin function)
app.delete('/api/ratings/:ratingId', async (req, res) => {
  try {
    const ratingId = parseInt(req.params.ratingId);
    
    if (isNaN(ratingId)) {
      return res.status(400).json({ error: 'Invalid rating ID' });
    }
    
    const result = await ratingsDB.deleteRating(ratingId);
    
    if (result.deletedRows === 0) {
      return res.status(404).json({ error: 'Rating not found' });
    }
    
    res.json({
      success: true,
      message: 'Rating deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting rating:', error);
    res.status(500).json({ error: 'Failed to delete rating' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Ratings server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Ratings server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API endpoints:`);
  console.log(`  POST /api/ratings - Save a new rating`);
  console.log(`  GET /api/ratings/:projectId - Get ratings for a project`);
  console.log(`  GET /api/ratings - Get all ratings`);
  console.log(`  DELETE /api/ratings/:ratingId - Delete a rating`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down ratings server...');
  ratingsDB.closeDatabase();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\nShutting down ratings server...');
  ratingsDB.closeDatabase();
  process.exit(0);
});
