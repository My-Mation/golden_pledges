const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../')));

// Data file path
const DATA_FILE = path.join(__dirname, 'data', 'reviews.json');

// Initialize data directory and file if they don't exist
async function initializeData() {
  try {
    await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
    
    // Check if reviews file exists, if not create it with empty array
    try {
      await fs.access(DATA_FILE);
    } catch {
      await fs.writeFile(DATA_FILE, JSON.stringify([]));
    }
  } catch (error) {
    console.error('Error initializing data:', error);
  }
}

// Helper function to read reviews from file
async function readReviews() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading reviews:', error);
    return [];
  }
}

// Helper function to write reviews to file
async function writeReviews(reviews) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(reviews, null, 2));
  } catch (error) {
    console.error('Error writing reviews:', error);
  }
}

// Routes

// Get all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await readReviews();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Get reviews for a specific stall
app.get('/api/reviews/:stallId', async (req, res) => {
  try {
    const { stallId } = req.params;
    const reviews = await readReviews();
    const stallReviews = reviews.filter(review => review.stallId === stallId);
    res.json(stallReviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews for this stall' });
  }
});

// Add a new review
app.post('/api/reviews', async (req, res) => {
  try {
    const { stallId, reviewerName, rating, comment } = req.body;
    
    // Validation
    if (!stallId || !reviewerName || rating === undefined || !comment) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    
    // Create new review object
        const newReview = {
            id: Date.now().toString(),
            stallId,
            reviewerName,
            rating: parseInt(rating),
            comment,
            timestamp: new Date().toISOString()
        };
    
    // Read existing reviews
    const reviews = await readReviews();
    
    // Add new review
    reviews.push(newReview);
    
    // Save reviews
    await writeReviews(reviews);
    
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add review' });
  }
});

// Update a review
app.put('/api/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { reviewerName, rating, comment } = req.body;
    
    // Validation
    if (!reviewerName || rating === undefined || !comment) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    
    // Read existing reviews
    const reviews = await readReviews();
    
    // Find the review to update
    const reviewIndex = reviews.findIndex(review => review.id === id);
    
    if (reviewIndex === -1) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    // Update the review
    reviews[reviewIndex] = {
      ...reviews[reviewIndex],
      reviewerName,
      rating: parseInt(rating),
      comment,
      timestamp: new Date().toISOString()
    };
    
    // Save reviews
    await writeReviews(reviews);
    
    res.json(reviews[reviewIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// Delete a review
app.delete('/api/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Read existing reviews
    const reviews = await readReviews();
    
    // Find the review to delete
    const reviewIndex = reviews.findIndex(review => review.id === id);
    
    if (reviewIndex === -1) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    // Remove the review
    reviews.splice(reviewIndex, 1);
    
    // Save reviews
    await writeReviews(reviews);
    
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

// Initialize data and start server
initializeData().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});