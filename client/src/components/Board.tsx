import React from 'react';
import Card from "./Card";
import {socket} from "../socket";
import BoardParams from "../types/BoardParams";

const Board = ({words, roles, highlightedWords}: BoardParams) => {

    return (
        <div className="board">
            {words.length ? words.map((word, index) => (
                <Card word={word} key={word} onClick={() => {
                    socket.emit('nextMove', index);
                }} index={index} role={roles[index]} highlight={highlightedWords[index]} />
            )) : <button onClick={() => {socket.emit("startGame")}}>Start the game</button>}
        </div>
    );
}

export default Board;