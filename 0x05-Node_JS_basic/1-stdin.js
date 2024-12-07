// Display welcome message
process.stdout.write('Welcome to ALX, what is your name?\n');

// Set encoding for stdin to handle text input
process.stdin.setEncoding('utf8');

// Event listener for data input
process.stdin.on('data', (input) => {
  const name = input.trim();
  process.stdout.write(`Your name is: ${name}\n`);
  // Close the stdin stream to end the program
  process.stdin.pause();
});

// Handle program termination (e.g., when the user presses Ctrl+C)
process.on('SIGINT', () => {
  process.stdout.write('This important software is now closing\n');
  process.exit();
});
