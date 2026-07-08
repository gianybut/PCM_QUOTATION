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

# Source path environment if it exists (allows finding node/npm in background/daemons)
if [ -f ".path_env" ]; then
    source ".path_env"
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    osascript -e 'display alert "PCM Quotation System Error" message "Node.js is not installed or not in PATH. Please run the installer (setup-macos) first." as critical'
    exit 1
fi

# Run the browser opener in the background (waits for server to start)
(
  sleep 4
  open "http://localhost:5173"
) &

# Run the start script which starts both backend & frontend in background
nohup npm run start > /dev/null 2>&1 &
