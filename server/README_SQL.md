# Golden Pledges Exhibition - SQL-based Review System Backend

This is the SQL-based backend for the review system of the Golden Pledges exhibition website.

## Features

- Add reviews for exhibition stalls with star ratings (1-5) and comments
- View reviews for specific stalls
- Update existing reviews
- Delete reviews
- Data stored in SQLite database for persistence

## Technologies Used

- Node.js
- Express.js
- SQLite3 (lightweight SQL database)

## Setup Instructions

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```
   
   Or for development with auto-restart:
   ```
   npm run dev
   ```

## Database Schema

The reviews are stored in an SQLite database with the following schema:

```sql
CREATE TABLE reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  stall_id TEXT NOT NULL,
  reviewer_name TEXT NOT NULL,
  rating INTEGER NOT NULL,
  comment TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### Get all reviews
```
GET /api/reviews
```

### Get reviews for a specific stall
```
GET /api/reviews/:stallId
```

### Add a new review
```
POST /api/reviews
```

Body:
```json
{
  "stallId": "string",
  "reviewerName": "string",
  "rating": number (1-5),
  "comment": "string"
}
```

### Update a review
```
PUT /api/reviews/:id
```

Body:
```json
{
  "reviewerName": "string",
  "rating": number (1-5),
  "comment": "string"
}
```

### Delete a review
```
DELETE /api/reviews/:id
```

## Data Storage

Reviews are stored in `server/data/reviews.db`. The SQLite database file is automatically created when the server starts if it doesn't exist.

## Frontend Integration

The frontend is updated to work with this backend. The review system is integrated into the stall view pages.

To use the review system:

1. Start the backend server
2. Open `view_with_reviews.html` in your browser
3. Navigate to any stall to see and add reviews

Note: For production, you would need to serve the frontend files through the backend or use a reverse proxy.