import Clue from "../types/Clue";
import {socket} from "../socket";

export function onSpymasterMove(playerId: string, clue: Clue) {
  const move = {
    type: "GIVE_CLUE",
    clue,
  };
  socket.emit("playerMove", { playerId, move });
}

export function onOperativeMove(playerId: string, wordIndex: number) {
  const move = {
    type: "GUESSING",
    wordIndex,
  };
  socket.emit("playerMove", { playerId, move });
}

export function endGuessing(playerId: string) {
  const move = {
    type: "END_GUESSING",
  };
  socket.emit("playerMove", { playerId, move });
}