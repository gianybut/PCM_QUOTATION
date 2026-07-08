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

echo "=================================================="
echo "         Stopping PCM Quotation System            "
echo "=================================================="
echo ""

# Find and kill processes on ports 5173 and 6942
PIDS=$(lsof -t -i :5173 -i :6942 2>/dev/null)
if [ -n "$PIDS" ]; then
    echo "Stopping background processes (PIDs: $PIDS)..."
    kill -9 $PIDS 2>/dev/null
    echo "PCM Quotation System has been stopped."
else
    echo "PCM Quotation System is not running."
fi
sleep 2
