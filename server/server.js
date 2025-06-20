const express = require('express');
const http = require('http');
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

const rooms = {};
const resetVotes = {};

io.on("connection", socket => {

    socket.on("join", roomId => {
        socket.join(roomId);
        if (!rooms[roomId]) {
            rooms[roomId] = [];
            console.log("Room created", rooms);
        }

        if (!rooms[roomId].includes(socket.id)) {
            rooms[roomId].push(socket.id);

        }

        const symbol = rooms[roomId].length === 1 ? "X" : "O";
        socket.emit("playerJoined", { playerId: socket.id, symbol });
        io.to(roomId).emit("playersInRoom", rooms[roomId]);
        getAvailableRooms();
    });

    socket.on("getAvailableRooms", () => {
        const availableRooms = Object.keys(rooms)
            .filter(roomId => rooms[roomId].length < 2) 
            .map(roomId => ({
                roomId: roomId,
                playersCount: rooms[roomId].length
            }));

        socket.emit("availableRooms", availableRooms); 
    });

    socket.on("startGame", (roomId) => {
        if (rooms[roomId] && rooms[roomId].length === 2) {
            io.to(roomId).emit("startGame");
            console.log("Game started in room", roomId);
        }

        getAvailableRooms();
    });

    socket.on("move", (data) => {
        socket.to(data.roomId).emit("opponentMove", data);
    });

    socket.on("resetRequest", (roomId, playerId) => {
        if (!resetVotes[roomId]) resetVotes[roomId] = new Set();

        resetVotes[roomId].add(playerId);
        console.log('reset vote in ', roomId, [...resetVotes[roomId]]);

        io.to(roomId).emit("resetVotesUpdate", resetVotes[roomId].size);

        if (resetVotes[roomId].size >= rooms[roomId].length) {
            io.to(roomId).emit("resetGame");
            resetVotes[roomId].clear();
        }

        console.log("reset VOTES AFTER RESTART", [...resetVotes[roomId]]);
    })

    socket.on("disconnect", () => {
        for (const roomId in rooms) {
            rooms[roomId] = rooms[roomId].filter(id => id !== socket.id);
            if (rooms[roomId].length === 0) {
                delete rooms[roomId];
                console.log("Client deleted", roomId);
            }
        }
        getAvailableRooms();
    });

    socket.on("leaveRoom", (roomId) => {
        if (rooms[roomId]) {
            rooms[roomId] = rooms[roomId].filter(id => id !== socket.id);
            socket.leave(roomId);

            console.log(`Room ${roomId} has ${rooms[roomId]} players`);
            if (rooms[roomId].length < 2) {
                console.log("Emitting playerLeft");
                io.to(roomId).emit("playerLeft");
                io.to(roomId).emit("playersInRoom", rooms[roomId]);
                io.to(roomId).emit("resetGame");
            }

            if (rooms[roomId].length === 0) {
                delete rooms[roomId];
            }
            console.log(`User ${socket.id} left room ${roomId}`);
            getAvailableRooms();
        }
    })
})

function getAvailableRooms() {
    for (const roomId in rooms) {
        if (rooms[roomId].length === 0) delete rooms[roomId];
    }

    const availableRooms = Object.keys(rooms)
        .filter(roomId => rooms[roomId].length < 2)
        .map(roomId => ({
            roomId,
            playersCount: rooms[roomId].length
        }));

    io.emit("availableRooms", availableRooms); 
}

server.listen(3001, () => console.log("✅ Сервер працює на порту 5173"));