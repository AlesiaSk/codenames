import Clue from "../types/Clue";
import { socket } from "../socket";

export function spymasterMove(playerId: string, clue: Clue) {
  socket.emit("playerMove", {
    playerId,
    move: {
      type: "GIVE_CLUE",
      clue,
    },
  });
}

export function endGuessing(playerId: string) {
  socket.emit("playerMove", {
    playerId,
    move: {
      type: "END_GUESSING",
    },
  });
}
