import express from 'express';
import { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

import createRoom from "./handlers/createRoom";

import Room from "./types/Room";

import Game from "./models/Game";
import Player from "./models/Player";


const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const rooms = new Map<string, Game>();

app.post('/room', (req: Request, res: Response) => {
    const id = uuidv4();
    rooms.set(id, createRoom());
    res.send({
        "status": "success",
        id
    });
});

app.post('/addPlayer', (req: Request, res: Response) => {
    const {nickname, role, team, roomId} =  req.body;
    const room = rooms.get(roomId);
    const player = new Player(nickname, role, team);

    if(room) {
        room.addPlayer(player);
        if(role === 'spymaster') {
            room.addSpymaster(player);
        }
        res.send({success:"true"});
    }
    else {
        res.send({error:"true"});
    }
});

app.get('/playerRole/:playerId', (req: Request, res: Response) => {
    const {playerId} =  req.params;
    const {roomId} =  req.query;
    if (typeof roomId === "string") {
        const room = rooms.get(roomId);
        const role = room?.spymasters.find((spymaster: Player) => spymaster.id === playerId) ? 'spymaster' : 'operative';
        res.send({
            "status": "success",
            role
        });
    }
});

io.on('connection', (socket) => {
    io.to(socket.id).emit("server_id", socket.id);

    socket.on("joinRoom", ( roomId: string, name: string ) => {
        socket.join(roomId);
        socket.data.nickname = name;
        socket.data.roomId = roomId;
        const room = rooms.get(roomId);

        if(room) {
            const currentPlayer = room.players.find((player: Player) => player.nickname === name);
            if(currentPlayer) {
                currentPlayer.addId(socket.id);
            }
        }
    });

    socket.on("isSpymasterRoleAvailable", (room: string, team: string) => {
        const currenGame = rooms.get(room);
    });

    socket.on("startGame", () => {
        const { roomId } = socket.data;
        const room = rooms.get(roomId);
        io.in(socket.data.roomId).emit("gameStarted");
        if(room) {
            io.in(roomId).emit("words", room.words);
            io.in(roomId).emit("currentRolesOfWords", room.currentState);
            room.spymasters.forEach((spymaster: Player) => {
                io.in(spymaster.id).emit("rolesOfWords", room.rolesOfWords);
            })
        }
    });

    socket.on("nextMove", (index: number) => {
        const { roomId } = socket.data;
        const room = rooms.get(roomId)
        if(room) {
            room.currentState[index] = room.rolesOfWords[index];
            io.in(roomId).emit("rolesOfWords", room.currentState);
        }
    });

    socket.on("disconnect", () => {
        console.log('disconnected')
    })
});

server.listen(8000);