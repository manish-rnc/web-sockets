const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const path = require('path');

const port = 8080;
const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.static(path.resolve('./public')));

io.on('connection', (socket) => {
  socket.on('client-message', (message) => {
    io.emit('new message', message);
  });
});

app.get('/', (req, res) => {
  return res.sendFile('../public/index.html');
});

server.listen(port, () => {
  console.log('Server started on port 8080');
});
