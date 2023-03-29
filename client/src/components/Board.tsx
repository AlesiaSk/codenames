import React from 'react';
import Card from "./Card";
import {socket} from "../socket";

import GameState from "../types/GameState";
import Player from "../types/Player";

interface BoardProps {
    player: Player,
    currentGameState: GameState,
    rolesOfWords: Array<string>
}

const Board = ({currentGameState, rolesOfWords, player}: BoardProps) => {
    const { words, currentBoard, players, nextMove } = currentGameState;

    return (
        <div className="board">
            {words.length ? words.map((word, index) => (
                <Card word={word} key={word} onClick={() => {
                    socket.emit('playerMove', index);
                }} index={index} role={currentBoard[index]} highlight={rolesOfWords[index]} />
            )) : <span>Loading...</span>}
        </div>
    );
}

export default Board;