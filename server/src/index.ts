import express from 'express';
import { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

import Game from "./models/Game";
import Player from "./models/Player";

import JoinGameParams from "./types/JoinGameParams";

import gameStore from "./InMemoryGameStore";

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

app.post('/room', (req: Request, res: Response) => {
    const id = uuidv4();
    gameStore.add(id, new Game());
    res.send({
        "status": "success",
        id
    });
});

io.on('connection', (socket) => {
    io.to(socket.id).emit("server_id", socket.id);

    socket.on("joinGame", ({gameId, playerId, nickname, role, team}: JoinGameParams, callback) => {
        socket.join(gameId);
        socket.data.gameId =
            gameId;
        const game = gameStore.get(gameId);
        console.log('joinGame')

        if(!game) {
            throw Error('There is no game with provided id');
        }

        if (!playerId) {
            const id = uuidv4();
            game.addPlayer(new Player(nickname, role, team, id));
            callback(id);
        } else {
             const player = game.getPlayer(playerId);

             if(!player) {
                 console.log('There is no player with provided id in the game');
             }
         }


        // callback({...player});
    });

    socket.on("startGame", () => {
        const { gameId } = socket.data;
        const game = gameStore.get(gameId);
        console.log('startGame')
        if (!game) {
            console.log('No room was found');
        } else {
            game.start();
            console.log('gameId', gameId)
            io.in(gameId).emit("gameStarted", game.isStarted);
            io.in(gameId).emit("words", game.words);
            io.in(gameId).emit("currentRolesOfWords", game.currentState);
            game.spymasters.forEach((spymaster) => {
                io.in(spymaster.id).emit("rolesOfWords", game.rolesOfWords);
            });
        }
    });

    socket.on("nextMove", (index: number) => {
        const { gameId } = socket.data;
        const game = gameStore.get(gameId);
        console.log('nextMove')
        if (!game) {
            console.log('No room was found');
        } else {
            game.nextMove(index);
            io.in(gameId).emit("rolesOfWords", game.currentState);
        }

    });

    socket.on("disconnect", () => {
        console.log('disconnected')
    })
});

server.listen(8000);