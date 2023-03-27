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

// const rooms = io.of("/").adapter.rooms;

interface socketsProps {
    [key: string]: Room
}

interface gamesProps {
    [key: string]: Game
}

const sockets:socketsProps = {};
const games: gamesProps = {};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const rooms = new Map();

app.post('/room', (req: Request, res: Response) => {
    const id = uuidv4();
    res.json( {id});
    rooms.set(id, createRoom());
    res.send({success:"true"});
});

app.post('/addPlayer', (req: Request, res: Response) => {
    const {nickname, role, team, roomId} =  req.body;
    const room = rooms.get(roomId);
    const player = new Player(nickname, role, team);
    room.addPlayer(player);
    if(role === 'spymaster') {
      room.addSpymaster(player);
    }
    
    console.log('room', room)
    res.send({success:"true"});
});

io.on('connection', (socket:any) => {
    io.to(socket.id).emit("server_id", socket.id);

    socket.on("joinRoom", ( room: string, name: string ) => {
        socket.join(room);
        socket.nickname = name;
        socket.room = rooms.get(room);
        socket.roomId = room;
        const currentPlayer = socket.room.players.find((player: Player) => player.nickname === name);
        currentPlayer.addId(socket.id);
        if (!sockets[room]) {
            sockets[room] = {};
            sockets[room].names = [];
        }
    });

    socket.on("isSpymasterRoleAvailable", (room: string, team: string) => {
        const currenGame = socket.room;
        if(currenGame.spymasters.length === 2) {
            return false
        }
        else {
            return currenGame.spymasters[0].team !== team
        }
    });

    socket.on("startGame", () => {
        const { roomId } = socket;
        io.in(socket.roomId).emit("gameStarted");
        io.in(roomId).emit("words", socket.room.words);
        io.in(roomId).emit("rolesOfWords", socket.room.spymasters.find((spymaster: Player) => spymaster.id === socket.id) ? socket.room.rolesOfWords : socket.room.currentState);
    });

    socket.on("nextMove", (index: number) => {
        socket.room.currentState[index] = socket.room.rolesOfWords[index];
        io.in(socket.roomId).emit("rolesOfWords", socket.room.currentState);
    });

    socket.on("disconnect", () => {
        console.log('disconnected')
    })
});

server.listen(8000);