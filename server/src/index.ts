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

interface Props {
    room: string,
    name: string,
    index: number
}

interface socketsProps {
    [key: string]: Room
}

interface gamesProps {
    [key: string]: Game
}

const sockets:socketsProps = {};
const games: gamesProps = {};

app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const rooms = new Map();

app.get('/getRoomId', (req: Request, res: Response) => {
    const id = uuidv4();
    res.json( {id});
    rooms.set(id, createRoom());
});

app.post('/addPlayer', (req: Request, res: Response) => {
    const {nickname, role, team, roomId} =  req.body;
    console.log('rooms', rooms)
    const room = rooms.get(roomId);
    const player = new Player(nickname, role, team);
    room.addPlayer(player);

    if(role === 'spymaster') {
      room.addSpymaster(player);
    }
    
    console.log('room', room)
    res.send('OK');
});
//
// app.post('/startGame', (req: Request, res: Response) => {
//     const { roomId } =  req.body;
//     const room = rooms.get(roomId);
//     room.start();
// });

io.on('connection', (socket:any) => {
    io.to(socket.id).emit("server_id", socket.id);
    socket.on("join_room", ({ room, name }: Props) => {
        socket.join(room);
        socket.nickname = socket.id;
        socket.room = rooms.get(room);
        const currentPlayer = socket.room.players.find((player: Player) => player.nickname === name);
        currentPlayer.addId(socket.id);

        console.log('socket.room', socket.room);
        if (!sockets[room]) {
            sockets[room] = {};
            sockets[room].names = [];
            sockets[room].start = false;
        }

        console.log('check', socket.room.spymasters.find((spymaster: Player) => spymaster.id === socket.id))
        io.in(room).emit("update", `${name} with is ${socket.id} has joined room ${room}`);
        io.in(room).emit("words", socket.room.words);
        io.in(room).emit("roles", socket.room.spymasters.find((spymaster: Player) => spymaster.id === socket.id) ? socket.room.wordsRoles : socket.room.currentState);
        console.log(`${name} with id ${socket.id} joind room ${room}`);

    });
    socket.on("isSpymasterRoleAvailable", (room: string, team: string) => {
        const currenGame = socket.room;
        if(currenGame.spymasters.length === 2) {
            return false
        }
        else {
            return currenGame.spymasters[0].team !== team
        }
    })
    socket.on("checkCardTeam", (room: string, index: number) => {
        socket.room.currentState[index] = socket.room.wordsRoles[index];
        io.in(room).emit("roles", socket.room.currentState);
    });

    socket.on("disconnect", () => {
        console.log('disconnected')
    })
});

server.listen(8000);