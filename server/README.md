# Golden Pledges Exhibition - Review System Backend

This is the backend for the review system of the Golden Pledges exhibition website.

## Features

- Add reviews for exhibition stalls
- View reviews for specific stalls
- Update existing reviews
- Delete reviews

## Technologies Used

- Node.js
- Express.js
- JSON file-based storage (for simplicity)

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

Reviews are stored in `server/data/reviews.json`. The file is automatically created when the server starts if it doesn't exist.

## Frontend Integration

The frontend is updated to work with this backend. The review system is integrated into the stall view pages.

To use the review system:

1. Start the backend server
2. Open `view_with_reviews.html` in your browser
3. Navigate to any stall to see and add reviews

Note: For production, you would need to serve the frontend files through the backend or use a reverse proxy.