const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
require('log-timestamp');

let roomIds = {};
let nrUsers = 0;

function randomInt(low, high) {
  let nrLoops = 0;
  do {
    var number = Math.floor(Math.random() * (high - low) + low);
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

  roomIds[socket.roomId] = socket.roomNr;
  ++nrUsers;

  console.log('User ' + nrUsers + ' registered in room: ' + socket.roomId);
  socket.on('disconnect', function(){
    // @todo: Notify on disconnect
    // io.to(socket.roomId).emit('sender-disconnected');
    // if (socket.subscribedRoom) {
    //     io.to(roomIds[socket.subscribedRoom]).emit('receiver-disconnected');
    // }

    delete roomIds[socket.roomId];
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

    socket.roomId = 'room-' + roomNr;
    socket.join(socket.roomId);
    io.to(socket.roomId).emit('subscribed', roomNr);
    console.log('User in ' + socket.roomId + ' joins ' + socket.roomId);
  });
});

// @todo: Handle SSL? https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener
http.listen(3001, function(){
  console.log('Listening on *:3001');
});
