# Science Exhibition Ratings System

This system provides a comprehensive star rating and review system for science exhibition projects with database integration.

## Features

- ⭐ **5-Star Rating System**: Interactive star rating with visual feedback
- 👤 **User Name Required**: Users must enter their name before rating
- 📊 **Real-time Updates**: Average ratings and review counts update instantly
- 🗂️ **Dropdown Menu**: Click to reveal all ratings and users
- 💾 **Database Storage**: Ratings stored in SQLite database with API
- 🔄 **Fallback System**: Automatically falls back to localStorage if database unavailable
- 📱 **Responsive Design**: Works on all device sizes

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Start the Ratings Server

```bash
npm start
```

The server will run on `http://localhost:3001`

### 3. Access the Science Exhibition

Open `sciencepages.html` in your browser and click on any science project to access the rating system.

## How It Works

### User Flow

1. **Enter Name**: Users must first enter their full name
2. **Rate Project**: Click on stars (1-5) to rate the project
3. **Submit Rating**: Click "Submit Rating" to save
4. **View All Ratings**: Click "View All Ratings & Users" dropdown to see all ratings

### Database Schema

```sql
CREATE TABLE ratings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  user_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### API Endpoints

- `POST /api/ratings` - Save a new rating
- `GET /api/ratings/:projectId` - Get ratings for a specific project
- `GET /api/ratings` - Get all ratings across all projects
- `DELETE /api/ratings/:ratingId` - Delete a rating (admin)
- `GET /health` - Health check

## File Structure

```
server/
├── ratings_db.js          # Database operations
├── ratings_server.js      # Express API server
├── package.json           # Dependencies
├── README_RATINGS.md      # This file
└── data/
    └── ratings.db         # SQLite database (created automatically)
```

## Database Integration

The system automatically tries to connect to the database first. If the database is unavailable, it gracefully falls back to localStorage, ensuring the rating system always works.

### Database Features

- **Data Persistence**: Ratings stored permanently in SQLite
- **User Tracking**: All ratings include user names and timestamps
- **Project Isolation**: Each project maintains separate rating data
- **Admin Functions**: Ability to delete inappropriate ratings

## Troubleshooting

### Server Won't Start

1. Check if port 3001 is available
2. Ensure all dependencies are installed: `npm install`
3. Check console for error messages

### Database Issues

1. Ensure the `data/` folder exists in the server directory
2. Check file permissions for database creation
3. Verify SQLite3 is properly installed

### Ratings Not Saving

1. Check if the ratings server is running
2. Look for CORS errors in browser console
3. Verify the API endpoint is accessible

## Development

### Adding New Features

1. **New Rating Fields**: Update the database schema in `ratings_db.js`
2. **API Endpoints**: Add new routes in `ratings_server.js`
3. **Frontend**: Modify `review.html` to use new features

### Testing

```bash
# Start in development mode with auto-reload
npm run dev

# Test API endpoints
curl http://localhost:3001/health
curl http://localhost:3001/api/ratings/1
```

## Security Considerations

- Input validation on all user inputs
- SQL injection protection through parameterized queries
- CORS enabled for local development
- Rate limiting can be added for production use

## Future Enhancements

- User authentication system
- Rating moderation tools
- Analytics dashboard
- Export functionality
- Mobile app integration
