import {GameMove} from "./Move";
import Player from "./Player";

interface GameState {
    isStarted: boolean,
    words: Array<string>,
    currentBoard: Array<string>,
    players: Array<Player>,
    nextMove: GameMove
}

export default GameState;