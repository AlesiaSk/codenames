import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

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

let game = new Game(['Test1', 'Test2', 'Test3', 'Test4', 'Test5'], ['red', 'blue', 'black', 'natural', 'red']);

io.on('connection', (socket:any) => {
    socket.emit("words", game.words);
    socket.emit("roles", game.currentState);
    socket.on("checkCardTeam", (index: number) => {
        console.log(`Card ${index} is `, game.wordsRoles[index]);
        game.currentState[index] = game.wordsRoles[index];
        io.emit("roles", game.currentState);
    });
    socket.on("disconnect", () => {
        console.log('disconnected')
        game = new Game(['Test1', 'Test2', 'Test3', 'Test4', 'Test5'], ['red', 'blue', 'black', 'natural', 'red']);
    })
});

server.listen(8000);