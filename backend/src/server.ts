import { createServer } from "http";
import { Server, Socket } from "socket.io";
require('log-timestamp');

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000", "https://clipboard.ninja"],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

interface roomIds {
    [index: string]: number;
}
interface mySocket extends Socket {
    roomNr?: number;
    roomId?: string;
}

const roomIds = {} as roomIds;
let nrUsers = 0;

const randomInt = (low: number, high: number) => {
    const number = Math.floor(Math.random() * (high - low) + low);
    let nrLoops = 0;
    do {
        if (++nrLoops > 5) {
            return new Error('All room numbers are taken');
        }
    } while (typeof(roomIds['room-' + number]) !== 'undefined');

    return number;
};

io.on("connection", (socket: mySocket) => {
    const roomNr = randomInt(100000, 999999);
    if (roomNr instanceof Error) {
        console.log('ERROR:', roomNr);
        return;
    }
    socket.roomNr = roomNr;
    socket.roomId = 'room-' + socket.roomNr;
    socket.join(socket.roomId);
    socket.emit('registered', socket.roomNr);

    roomIds[socket.roomId] = 1;
    ++nrUsers;

    console.log(`User ${nrUsers} registered in room: ${socket.roomId}`);
    socket.on('disconnect', () => {
        if (typeof socket.roomId == "undefined") {
            return;
        }
        roomIds[socket.roomId]--;
        io.to(socket.roomId).emit('unsubscribed', roomIds[socket.roomId]);

        if (roomIds[socket.roomId] <= 0) {
            // Nobody in the room anymore, delete it
            delete roomIds[socket.roomId];
        }
        --nrUsers;
        console.log(`User disconnected from ${socket.roomId}`);
    });
    socket.on('publish', msg => {
        if (typeof socket.roomId == "undefined") {
            return;
        }
        io.to(socket.roomId).emit('message', msg);
    });
    socket.on('join', roomNr => {
        if (typeof socket.roomId == "undefined") {
            return;
        }
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
        console.log(`User ${roomIds[socket.roomId]} joins ${socket.roomId}`);
    });
});

httpServer.listen(3001);
console.log('Server started');
