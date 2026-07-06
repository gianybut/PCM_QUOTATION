#!/bin/bash

# Change directory to the folder containing the script
cd "$(dirname "$0")"

echo "=================================================="
echo "         Starting PCM Quotation System            "
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install it first from https://nodejs.org/"
    exit 1
fi

# Run the browser opener in the background
(
  echo "Waiting for servers to initialize..."
  sleep 4
  echo "Opening http://localhost:5173 in your browser..."
  open "http://localhost:5173"
) &

# Run the start script which installs dependencies and starts both backend & frontend
npm run start
