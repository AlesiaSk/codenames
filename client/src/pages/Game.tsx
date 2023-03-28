import React, {useEffect, useState} from "react";
import Board from "../components/Board";
import Lobby from "../components/Lobby";

import {socket} from "../socket";

const Game = () => {
    const [gameIsStarted, setGameIsStarted] = useState(false);
    const [words, setWords] = useState<Array<string>>([]);
    const [roles, setRoles] = useState<Array<string>>([]);
    const [highlightedWords, setHighlightedWords] = useState<Array<string>>([]);

    useEffect(() => {
        function gameIsStarted (value : boolean) {
            setGameIsStarted(value);
        }

        function onWordsChange(words: Array<string>) {
            setWords(words);
        }

        //TODO: return only selected role
        function onRolesChange(roles: Array<string>) {
            setRoles(roles);
        }

        function getHighlightedWords(words: Array<string>) {
            setHighlightedWords(words);
        }

        socket.on('gameStarted', gameIsStarted);
        socket.on('words', onWordsChange);
        socket.on( 'currentRolesOfWords', onRolesChange);
        socket.on('rolesOfWords', getHighlightedWords);

        return (() => {
            socket.off('gameStarted', gameIsStarted);
            socket.off('words', onWordsChange);
            socket.off('rolesOfWords',getHighlightedWords);
            socket.off('currentRolesOfWords', onRolesChange);
        });
    }, []);


    return (
        <>
            { gameIsStarted ?
                <Board words={words} highlightedWords={highlightedWords} roles={roles} /> :
                <Lobby />
            }
        </>
    )
}

export default Game