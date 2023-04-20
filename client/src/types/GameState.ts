import { GameMove } from "./Move";
import Player, { Team } from "./Player";

interface GameState {
  isStarted: boolean;
  words: Array<string>;
  currentBoard: Array<string>;
  nextMove: GameMove;
  winner: Team;
}

export default GameState;
