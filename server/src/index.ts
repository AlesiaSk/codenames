import express from "express";
import { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

import Game from "./models/Game";
import Player, { PlayerId, Role } from "./models/Player";

import JoinGameParams from "./types/JoinGameParams";
import { PlayerMove } from "./types/Move";

import gameStore from "./InMemoryGameStore";
import JoinTeamParams from "./types/JoinTeamParams";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/game", (req: Request, res: Response) => {
  const id = uuidv4();
  gameStore.add(id, new Game());
  res.send({
    status: "success",
    id,
  });
});

type SocketId = string;
const socketsStorage = new Map<PlayerId, SocketId>();
io.on("connection", (socket) => {
  io.to(socket.id).emit("server_id", socket.id);

  socket.on("joinGame", ({ gameId, nickname }: JoinGameParams, callback) => {
    const game = gameStore.get(gameId);

    if (!game) {
      console.log("There is no game with provided id");
      return;
    }
    // add check if this nickname exists

    if (game.isStarted) {
      console.log("New players can not join when the game is in progress");
      return;
    }

    socket.join(gameId);
    socket.data.gameId = gameId;
    const id = uuidv4();
    io.of("/").adapter.rooms.set(id, new Set(socket.id));
    socketsStorage.set(id, socket.id);
    game.addPlayer(new Player(nickname, id));
    callback(id);
    io.in(gameId).emit("gamePlayers", Array.from(game.players.values()));
  });

  socket.on(
    "joinTeam",
    ({ playerId, role, team }: JoinTeamParams, callback) => {
      const { gameId } = socket.data;
      const game = gameStore.get(gameId);

      if (!game) {
        console.log("There is no game with provided id");
        return;
      }

      if (game.isStarted) {
        console.log("New players can not join when the game is in progress");
        return;
      }

      const player = game.getPlayer(playerId);

      if (!player) {
        console.log("There is no player with provided id");
        return;
      }

      player.setRole(role);
      player.setTeam(team);

      io.in(gameId).emit("gamePlayers", Array.from(game.players.values()));
    }
  );

  socket.on("startGame", () => {
    const { gameId } = socket.data;
    const game = gameStore.get(gameId);

    if (!game) {
      console.log("No game was found");
      return;
    }

    game.start();
    game.spymasters.forEach((spymaster) => {
      const socketId = socketsStorage.get(spymaster.id);
      if (socketId) {
        io.in(socketId).emit("rolesOfWords", game.rolesOfWords);
      }
    });

    io.in(gameId).emit("gameMove", {
      isStarted: game.isStarted,
      words: game.words,
      currentBoard: game.currentBoard,
      players: game.players,
      nextMove: game.nextMove,
    });
  });

  socket.on(
    "playerMove",
    ({ playerId, move }: { playerId: string; move: PlayerMove }) => {
      const { gameId } = socket.data;
      const game = gameStore.get(gameId);

      if (!game) {
        console.log("No game was found");
        return;
      }

      if (!game.isMoveValid(playerId, move)) {
        console.log("Move is not valid");
        return;
      }
      game.move(playerId, move);

      io.in(gameId).emit("gameMove", {
        isStarted: game.isStarted,
        words: game.words,
        currentBoard: game.currentBoard,
        players: game.players,
        nextMove: game.nextMove,
        currentClue: game.currentClue,
        winner: game.winner,
      });
    }
  );

  socket.on(
    "restoreGameConnection",
    (
      { playerId, gameId }: { playerId: PlayerId; gameId: string },
      callback
    ) => {
      const game = gameStore.get(gameId);

      if (!game) {
        console.log("There is no game with provided id");
        callback({
          error: "There is no game with provided id",
        });
        return;
      }

      const player = game.players.get(playerId);

      if (!player) {
        console.log("There is no such player in provided game");
        callback({
          error: "There is no such player in provided game",
        });
        return;
      }

      socket.join(gameId);
      socketsStorage.set(playerId, socket.id);
      socket.data.gameId = gameId;
      callback({
        gameState: {
          isStarted: game.isStarted,
          words: game.words,
          currentBoard: game.currentBoard,
          players: game.players,
          nextMove: game.nextMove,
        },
        player,
        players: Array.from(game.players.values()),
        rolesOfWords:
          player.role === Role.SPYMASTER ? game.rolesOfWords : undefined,
      });
    }
  );

  socket.on("doesGameExist", (gameId: string, callback) => {
    const game = gameStore.get(gameId);

    if (!game) {
      callback({
        error: "There is no game with provided id",
      });
      return;
    }

    callback({
      gameId,
    });
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

server.listen(8000);
