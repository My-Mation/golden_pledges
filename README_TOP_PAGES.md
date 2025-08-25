# Top Pages Feature - Science Exhibition Ratings

## Overview
The Top Pages feature displays projects ranked by their average star ratings, creating a leaderboard of the most popular science exhibition projects.

## Features

### 🏆 **Ranking System**
- **Gold (1st Place)**: Projects with highest average ratings
- **Silver (2nd Place)**: Second-highest rated projects  
- **Bronze (3rd Place)**: Third-highest rated projects
- **Standard Ranking**: All other projects ranked by rating

### 📊 **Rating Display**
- **Star Visualization**: Shows filled and empty stars based on average rating
- **Average Score**: Displays precise average rating (e.g., 4.3/5.0)
- **Rating Count**: Shows total number of ratings received
- **Project Details**: Full project image, title, and description

### 🔄 **Real-time Updates**
- Automatically loads when "Top Pages" tab is clicked
- Fetches latest ratings from database
- Updates rankings based on new ratings
- Handles server connectivity issues gracefully

## How It Works

### 1. **Data Collection**
- Fetches all ratings from the database via `/api/ratings` endpoint
- Processes star ratings (1-5) and text-only reviews (rating = 0)
- Calculates average ratings per project

### 2. **Ranking Algorithm**
- Sorts projects by average rating (highest first)
- Filters out projects with no ratings
- Applies special styling to top 3 positions

### 3. **User Interface**
- Loading spinner while fetching data
- Error handling for server issues
- Responsive grid layout
- Click to view detailed project page

## Technical Implementation

### **Frontend (sciencepages.html)**
```javascript
// Load top-rated projects from database
async function loadTopProjects() {
  // Fetches from /api/ratings endpoint
  // Processes and displays ranked projects
}

// Process ratings data to calculate project statistics
function processProjectRatings(ratings) {
  // Calculates averages and totals per project
}
```

### **Backend (ratings_server.js)**
```javascript
// Get all ratings across all projects
app.get('/api/ratings', async (req, res) => {
  const ratings = await ratingsDB.getAllRatings();
  res.json({ success: true, ratings: ratings });
});
```

### **Database (ratings_db.js)**
```javascript
// Get all ratings with project information
function getAllRatings() {
  // Returns all ratings with project descriptions
}
```

## Usage

### **For Users**
1. Click the "Top Pages" tab in the navigation
2. View projects ranked by popularity
3. Click any project card to see detailed reviews
4. Rate projects to influence rankings

### **For Administrators**
1. Start the ratings server using startup scripts
2. Monitor database for rating submissions
3. View real-time ranking updates

## Error Handling

### **Server Not Running**
- Shows helpful error message
- Provides startup instructions
- Includes retry button

### **Network Issues**
- Graceful fallback messages
- Clear error descriptions
- User-friendly retry options

### **No Ratings Available**
- Displays encouraging message
- Prompts users to be first to rate
- Maintains professional appearance

## Database Schema

### **Ratings Table**
```sql
CREATE TABLE ratings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  user_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 0 AND rating <= 5),
  review_text TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Note**: Rating 0 is used for text-only reviews, ratings 1-5 for star ratings.

## Startup Requirements

### **Prerequisites**
- Node.js server running on port 3001
- SQLite database with ratings data
- CORS enabled for cross-origin requests

### **Startup Scripts**
- **Windows**: `start_ratings_system.bat`
- **Mac/Linux**: `start_ratings_system.sh`

## Future Enhancements

### **Potential Features**
- **Time-based Rankings**: Weekly/monthly top projects
- **Category Filtering**: Top projects by science field
- **Trending Projects**: Projects gaining popularity
- **Export Rankings**: Download top projects list
- **Admin Dashboard**: Manage and moderate ratings

### **Performance Optimizations**
- **Caching**: Store rankings in memory
- **Pagination**: Load top projects in batches
- **Real-time Updates**: WebSocket for live ranking changes
- **CDN Integration**: Optimize image loading

## Troubleshooting

### **Common Issues**

1. **"Ratings server is not running"**
   - Solution: Start server using startup scripts
   - Check if port 3001 is available

2. **"Unable to load top projects"**
   - Solution: Check server logs for errors
   - Verify database connectivity

3. **Projects not ranking correctly**
   - Solution: Check rating data integrity
   - Verify average calculation logic

### **Debug Information**
- Check browser console for JavaScript errors
- Monitor server logs for API issues
- Verify database contains rating data
- Test API endpoints directly

## API Endpoints

### **GET /api/ratings**
- **Purpose**: Retrieve all ratings across all projects
- **Response**: JSON with ratings array and project information
- **Use Case**: Populating Top Pages leaderboard

### **Response Format**
```json
{
  "success": true,
  "ratings": [
    {
      "id": 1,
      "project_id": 1,
      "user_name": "John Doe",
      "rating": 5,
      "review_text": "Excellent project!",
      "timestamp": "2025-01-15T10:30:00Z"
    }
  ]
}
```

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Maintainer**: Science Exhibition Team
