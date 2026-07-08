#!/bin/bash

# Resolve symlink to get actual script directory
SOURCE=${BASH_SOURCE[0]}
while [ -L "$SOURCE" ]; do
  DIR=$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )
  SOURCE=$(readlink "$SOURCE")
  [[ $SOURCE != /* ]] && SOURCE=$DIR/$SOURCE
done
DIR=$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )
cd "$DIR"

# Stop any existing instances running on ports 6942 (backend) or 5173 (frontend)
lsof -ti:6942,5173 | xargs kill -9 2>/dev/null || true

echo "=================================================="
echo "         Starting PCM Quotation System            "
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install it first from https://nodejs.org/"
    exit 1
fi

# Create/update macOS Desktop shortcut (.command launcher)
DESKTOP_SHORTCUT="$HOME/Desktop/PCM Quotation System.command"
ln -sf "$DIR/startup.command" "$DESKTOP_SHORTCUT"
chmod +x "$DESKTOP_SHORTCUT"

# Run the browser opener in the background
(
  echo "Waiting for servers to initialize..."
  sleep 4
  echo "Opening http://localhost:5173 in your browser..."
  open "http://localhost:5173"
) &

# Run the start script which installs dependencies and starts both backend & frontend
npm run start
