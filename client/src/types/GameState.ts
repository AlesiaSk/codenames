import { GameMove } from "./Move";
import Player, { Team } from "./Player";
import Clue from "./Clue";

interface GameState {
  isStarted: boolean;
  words: Array<string>;
  currentBoard: Array<string>;
  nextMove: GameMove;
  currentClue?: Clue;
  winner?: Team;
  players: Array<Player>;
}

export default GameState;
