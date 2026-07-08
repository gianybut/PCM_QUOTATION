const { spawn } = require('child_process');
const path = require('path');

const runDir = path.dirname(process.execPath);

console.log('==================================================');
console.log('         PCM Quotation System Setup                ');
console.log('==================================================');
console.log('');

if (process.platform === 'win32') {
  console.log('Starting Windows installer...');
  const child = spawn('cmd.exe', ['/c', 'install.bat'], {
    cwd: runDir,
    stdio: 'inherit'
  });
  child.on('close', (code) => {
    process.exit(code);
  });
} else if (process.platform === 'darwin') {
  console.log('Starting macOS installer...');
  const child = spawn('osascript', ['-e', `tell application "Terminal" to do script "cd '${runDir}' && chmod +x install.command && ./install.command"`], {
    stdio: 'inherit'
  });
  child.on('close', (code) => {
    process.exit(code);
  });
} else {
  console.log('Unsupported platform:', process.platform);
  process.exit(1);
}
