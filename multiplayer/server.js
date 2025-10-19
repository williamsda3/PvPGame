const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let players = {};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A player connected');

  // Prompt the player for their move
  socket.on('sendMove', (move) => {
    // Store the player's move
    players[socket.id] = move;

    // Check if both players have made a move
    if (Object.keys(players).length === 2) {
      // Output both moves
      io.emit('showMoves', players);

      // Clear stored moves for the next round
      players = {};
    }
  });

  socket.on('disconnect', () => {
    console.log('A player disconnected');
  });
});

http.listen(3000, () => {
  console.log('Server listening on *:3000');
});
