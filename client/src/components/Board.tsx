import React, {useEffect, useState} from 'react';
import Card from "./Card";
import {socket} from "../socket";
import {useParams} from "react-router-dom";
import {GameAPI} from "../api/GameAPI";

const Board = () => {
    const [words, setWords] = useState<Array<string>>([]);
    const [roles, setRoles] = useState<Array<string>>([]);
    const [highlightedWords, setHighlightedWords] = useState<Array<string>>([]);
    const [userRole, setUserRole] = useState('');
    const { id: roomId } = useParams();

    useEffect( () => {
        function onWordsChange(words: Array<string>) {
            setWords(words);
        }

        //TODO: return only selected role
        function onRolesChange(roles: Array<string>) {
            setRoles(roles);
            console.log('roles', roles)
        }

        function getHighlightedWords(words: Array<string>) {
            setHighlightedWords(words);
        }

        async function checkRole () {
            const res = await GameAPI.getPlayerRole(socket.id, roomId);
            return res.role;
        }

        checkRole().then(role => {
            setUserRole(role);
        });

        // TODO: remove words socket
        socket.on('words', onWordsChange);
        socket.on( 'currentRolesOfWords', onRolesChange);
        socket.on('rolesOfWords', getHighlightedWords);

        return () => {
            socket.off('words', onWordsChange);
            socket.off('rolesOfWords',getHighlightedWords);
            socket.off('currentRolesOfWords', onRolesChange);
        };
    }, [userRole]);

    return (
        <div className="board">
            {words.length ? words.map((word, index) => (
                <Card word={word} key={word} onClick={() => {
                    socket.emit('nextMove', index);
                }} index={index} role={roles[index]} highlight={highlightedWords[index]} />
            )) : <span>Loading...</span>}
        </div>
    );
}

export default Board;