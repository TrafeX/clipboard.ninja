var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
require('log-timestamp');

var roomIds = {};
var nrUsers = 0;

function randomInt(low, high) {
    var nrLoops = 0;
    do {
        var number = Math.floor(Math.random() * (high - low) + low);
        if (++nrLoops > 5) {
            return new Error('All room numbers are taken');
        }
    } while (typeof(roomIds['room-' + number]) != 'undefined')

    return number;
}

app.use(express.static(__dirname + '/web'));

io.on('connection', function(socket){

    socket.roomNr = randomInt(100000, 999999);
    if (socket.roomNr instanceof Error) {
        console.log('ERROR:', socket.roomNr);
        return;
    }
    socket.roomId = 'room-' + socket.roomNr;
    socket.emit('registered', socket.roomNr);

    roomIds[socket.roomId] = socket.id;
    ++nrUsers;

    console.log('User ' + nrUsers + ' registered in room: ' + socket.roomId);
    socket.on('disconnect', function(){
        io.to(socket.roomId).emit('sender-disconnected');
        if (socket.subscribedRoom) {
            io.to(roomIds[socket.subscribedRoom]).emit('receiver-disconnected');
        }

        delete roomIds[socket.roomId];
        --nrUsers;
        console.log('User disconnected from ' + socket.roomId);
    });
    socket.on('publish', function(msg){
        io.to(socket.roomId).emit('message', msg);
    });
    socket.on('join', function(room){
        if (typeof(roomIds['room-' + room]) == 'undefined') {
            socket.emit('global-error', 'Sender ID doesn\'t exists. Enter the sender ID of the "sending" device');
            return;
        }
        if (socket.subscribedRoom == 'room-' + room) {
            return;
        }
        if (socket.subscribedRoom) {
            io.to(roomIds[socket.subscribedRoom]).emit('receiver-disconnected');
            socket.leave(socket.subscribedRoom);
        }
        socket.subscribedRoom = 'room-' + room;
        io.to(roomIds[socket.subscribedRoom]).emit('subscribed-listener', socket.roomId);
        socket.join(socket.subscribedRoom);
        socket.emit('subscribed', room);
        console.log('User in ' + socket.roomId + ' joins ' + socket.subscribedRoom);
    });
});

http.listen(3001, function(){
    console.log('Listening on *:3001');
});
