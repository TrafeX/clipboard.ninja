const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
require('log-timestamp');

let roomIds = {};
let nrUsers = 0;

function randomInt(low, high) {
  const number = Math.floor(Math.random() * (high - low) + low);
  let nrLoops = 0;
  do {
    if (++nrLoops > 5) {
      return new Error('All room numbers are taken');
    }
  } while (typeof(roomIds['room-' + number]) !== 'undefined');

  return number;
}

io.on('connection', function(socket){

  socket.roomNr = randomInt(100000, 999999);
  if (socket.roomNr instanceof Error) {
    console.log('ERROR:', socket.roomNr);
    return;
  }
  socket.roomId = 'room-' + socket.roomNr;
  socket.join(socket.roomId);
  socket.emit('registered', socket.roomNr);

  roomIds[socket.roomId] = 1;
  ++nrUsers;

  console.log('User ' + nrUsers + ' registered in room: ' + socket.roomId);
  socket.on('disconnect', function() {

    roomIds[socket.roomId]--;
    io.to(socket.roomId).emit('unsubscribed', roomIds[socket.roomId]);

    if (roomIds[socket.roomId] <= 0) {
      // Nobody in the room anymore, delete it
      delete roomIds[socket.roomId];
    }
    --nrUsers;
    console.log('User disconnected from ' + socket.roomId);
  });
  socket.on('publish', function(msg){
    io.to(socket.roomId).emit('message', msg);
  });
  socket.on('join', function(roomNr){

    if (typeof(roomIds['room-' + roomNr]) === 'undefined') {
      socket.emit('deviceid-not-exists');
      return;
    }
    // Leave current room
    roomIds[socket.roomId]--;

    // Join new room
    socket.roomId = 'room-' + roomNr;
    socket.join(socket.roomId);
    roomIds[socket.roomId]++;

    io.to(socket.roomId).emit('subscribed', roomNr, roomIds[socket.roomId]);
    console.log('User in ' + socket.roomId + ' joins ' + socket.roomId);
  });
});

http.listen(3001, function(){
  console.log('Listening on *:3001');
});
