const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to get player move from user input
function getPlayerMove() {
  rl.question('Enter your move (e.g., "attack"): ', (move) => {
    console.log('You chose:', move);
    // Send the move to the server (in a real scenario, you'd use a network request)
    console.log('Sending move to server...');
    console.log(`player1 ${move}`);
    rl.close();
  });
}

// Get the player's move
getPlayerMove();
