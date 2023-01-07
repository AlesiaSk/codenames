import { Request, Response } from 'express';

const express = require('express');
const { createServer } = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const app = express();
const server = createServer(app);
const io = new Server(server, cors());

const words = ['Test1', 'Test2', 'Test3', 'Test4', 'Test5'];
const roles = ['red', 'blue', 'black', 'natural', 'red'];
let currentRoles = new Array(5).fill('none')

io.on('connection', (socket:any) => {
    socket.emit("words", words);
    socket.emit("roles", currentRoles);
    socket.on("checkCardTeam", (index: number) => {
        console.log(`Card ${index} is `, roles[index]);
        currentRoles[index] = roles[index];
        io.emit("roles", currentRoles);
    });
    socket.on("disconnect", () => {
        currentRoles = new Array(5).fill('none');
    })
});

server.listen(8000);