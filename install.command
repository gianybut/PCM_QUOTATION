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
echo "         PCM Quotation System Installer            "
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed."
    echo "Downloading Node.js installer..."
    curl -L -o node-installer.pkg https://nodejs.org/dist/v20.11.1/node-v20.11.1.pkg
    echo "Opening Node.js installer wizard..."
    open node-installer.pkg
    echo ""
    echo "Please complete the Node.js installation wizard that just opened."
    echo "Once Node.js is installed, please close this terminal window and double-click install.command again to finish installing!"
    read -n 1 -s -r -p "Press any key to close..."
    rm -f node-installer.pkg
    exit 0
fi

echo "Node.js is installed."
echo ""
echo "Installing project dependencies (this may take a minute)..."
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..

echo ""
echo "Creating Desktop shortcut..."
DESKTOP_SHORTCUT="$HOME/Desktop/PCM Quotation System.command"
ln -sf "$DIR/startup.command" "$DESKTOP_SHORTCUT"
chmod +x "$DESKTOP_SHORTCUT"

echo ""
echo "=================================================="
echo "          Installation Completed Successfully!     "
echo "=================================================="
echo ""
echo "A shortcut \"PCM Quotation System.command\" has been created on your Desktop."
echo "You can double-click it anytime to start the system."
echo ""
read -n 1 -s -r -p "Press any key to finish..."
