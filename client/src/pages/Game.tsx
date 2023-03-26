import React, {useEffect, useState} from "react";
import Board from "../components/Board";
import Lobby from "../components/Lobby";

import {socket} from "../socket";

const Game = () => {
    const [gameIsStarted, setGameIsStarted] = useState(false);

    useEffect(() => {
        function gameIsStarted () {
            setGameIsStarted(true);
        }

        socket.on('gameStarted', gameIsStarted);

        return (() => {
            socket.off('gameStarted', gameIsStarted);
        });
    }, []);


    return (
        <>
            { gameIsStarted ?
                <Board /> :
                <Lobby />
            }
        </>
    )
}

export default Game