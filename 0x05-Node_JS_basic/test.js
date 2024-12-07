const { spawn } = require('child_process');

const child = spawn('node', ['app.js']);

// Simulate user input
child.stdin.write('John\n');

// Simulate Ctrl+C after 1 second
setTimeout(() => {
  child.kill('SIGINT');
}, 1000);

// Handle child process output
child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

