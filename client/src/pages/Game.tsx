import React, {useEffect, useState} from "react";
import Board from "../components/Board";
import Lobby from "../components/Lobby";
import GameState from "../types/GameState";
import Player from "../types/Player";

import {socket} from "../socket";

const Game = () => {
    const [player, setPlayer] = useState<Player>();
    const [currentGameState, setCurrentGameState] = useState<GameState>();
    const [rolesOfWords, setRolesOfWords] = useState<Array<string>>([]);

    useEffect(() => {
        function onNextMove(nextGameState: GameState) {
            setCurrentGameState(nextGameState);
        }

        function onRolesOfWords(roles: Array<string>) {
            setRolesOfWords(roles);
        }

        socket.on('nextMove', onNextMove);
        socket.on('rolesOfWords', onRolesOfWords);

        return (() => {
            socket.off('nextMove', onNextMove);
            socket.off('rolesOfWords', onRolesOfWords);
        });
    }, []);


    return (
        <>
            { (currentGameState && player) ?
                <Board player={player} currentGameState={currentGameState} rolesOfWords={rolesOfWords} /> :
                <Lobby onGameJoined={setPlayer} />
            }
        </>
    )
}

export default Game