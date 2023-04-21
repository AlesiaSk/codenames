import { GameMove } from "./Move";
import { Team } from "./Player";
import Clue from "./Clue";

interface GameState {
  isStarted: boolean;
  words: Array<string>;
  currentBoard: Array<string>;
  nextMove: GameMove;
  currentClue?: Clue;
  winner?: Team;
}

export default GameState;
