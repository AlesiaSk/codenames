import React, {useEffect, useState} from "react";
import Board from "../components/Board";
import Lobby from "../components/Lobby";
import GameState from "../types/GameState";
import Player from "../types/Player";

import {socket} from "../socket";
import {useNavigate, useParams} from "react-router-dom";

interface RestoreGameConnectionParams {
    gameState: GameState,
    player: Player,
    rolesOfWords: Array<string>,
    error: string
}

const Game = () => {
    const [player, setPlayer] = useState<Player>();
    const [currentGameState, setCurrentGameState] = useState<GameState>();
    const [rolesOfWords, setRolesOfWords] = useState<Array<string>>([]);
    const navigate = useNavigate();
    const { id: gameId } = useParams();

    useEffect(() => {
        function onGameMove(nextGameState: GameState) {
            setCurrentGameState(nextGameState);
        }

        function onRolesOfWords(roles: Array<string>) {
            setRolesOfWords(roles);
        }

        socket.on('gameMove', onGameMove);
        socket.on('rolesOfWords', onRolesOfWords);

        return (() => {
            socket.off('gameMove', onGameMove);
            socket.off('rolesOfWords', onRolesOfWords);
        });
    }, []);

    useEffect(() => {

        if (player) {
            return;
        }

        const playerId = sessionStorage.getItem(`game:${gameId}`);
        socket.emit("isGameExists", gameId, ({error}: {error: string | undefined}) => {
            if (error) {
                navigate('/error');
            }
        });


        if (playerId) {
            socket.emit("restoreGameConnection", {gameId, playerId}, ({gameState, rolesOfWords, player, error}: RestoreGameConnectionParams) => {
                if (error) {
                    navigate('/error');
                }

                setCurrentGameState(gameState);
                setPlayer(player);
                setRolesOfWords(rolesOfWords);
            });
        }
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