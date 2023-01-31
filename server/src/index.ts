import express from 'express';
import { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

interface Props {
    room: string,
    name: string,
    index: number
}

interface Room {
    room?: string,
    names?: Array<string>,
    start?: boolean
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

class Game {
    public words: Array<string>;
    public wordsRoles: Array<string>;
    public currentState: Array<string>;

    constructor(words: Array<string>, wordsRoles: Array<string>) {
        this.wordsRoles = wordsRoles;
        this.words = words;
        this.currentState = new Array(5).fill('none');
    }
}

app.get('/roomId', (req: Request, res: Response) => {
    res.json( {id: uuidv4()});
});

let game = new Game(['Test1', 'Test2', 'Test3', 'Test4', 'Test5'], ['red', 'blue', 'black', 'neutral', 'red']);

io.on('connection', (socket:any) => {
    console.log(`user ${socket.id} has connected`);
    io.to(socket.id).emit("server_id", socket.id);
    socket.on("join_room", ({ room, name }: Props) => {
        try {
            socket.join(room);
            console.log('joined')
            socket.nickname = name;
            socket.room = room;
            const roomGame = new Game(['Test1', 'Test2', 'Test3', 'Test4', 'Test5'], ['red', 'blue', 'black', 'neutral', 'red']);
            games[room] = roomGame;
            if (!sockets[room]) {
                sockets[room] = {};
                sockets[room].names = [];
                sockets[room].start = false;
                // sockets[room].names = {name};
            }
            // @ts-ignore
            sockets[room].names = [...sockets[room].names, name];
            if (io.sockets && io.sockets.adapter.rooms) {
                // @ts-ignore
                console.log('player count', io.sockets.adapter.rooms.get(room).size)
                // @ts-ignore
                io.in(room).emit("player_count", io.sockets.adapter.rooms.get(room).size);
            }
            io.in(room).emit("update", `${name} has joined room ${room}`);
            io.in(room).emit("words", games[room].words);
            io.in(room).emit("roles", games[room].currentState);
            console.log(`${name} joind room ${room}`);
        } catch (err) {
            // @ts-ignore
            console.log(err.message);
        }
    });
    socket.on("checkCardTeam", (room: string, index: number) => {
        try {
            console.log('index', index);
            console.log('room', room)
            console.log(`Card ${index} is `, games[room].wordsRoles[index]);
            games[room].currentState[index] = games[room].wordsRoles[index];
            io.in(room).emit("roles", games[room].currentState);
        } catch (error) {
            // @ts-ignore
            console.log(error.message);
        }

    });
    socket.on("disconnect", () => {
        console.log('disconnected')
        game = new Game(['Test1', 'Test2', 'Test3', 'Test4', 'Test5'], ['red', 'blue', 'black', 'neutral', 'red']);
    })
});

server.listen(8000);