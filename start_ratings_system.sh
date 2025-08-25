#!/bin/bash

echo "Starting Science Exhibition Ratings System..."
echo

echo "1. Installing dependencies..."
cd server
npm install
echo

echo "2. Starting ratings server..."
echo "The server will run on http://localhost:3001"
echo

echo "3. Opening science exhibition page..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open ../sciencepages.html
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open ../sciencepages.html
fi
echo

echo "4. Server is starting..."
npm start
