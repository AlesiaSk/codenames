import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Card from "./Card";
import {socket} from "../socket";

const Board = () => {
    const [words, setWords] = useState<Array<string>>([]);
    const [roles, setRoles] = useState<Array<string>>([]);
    const { id: roomId } = useParams();

    useEffect(() => {
        function onWordsChange(words: Array<string>) {
            setWords(words);
        }

        //TODO: return only selected role
        function onRolesChange(roles: Array<string>) {
            setRoles(roles);
        }

        // TODO: remove words socket
        socket.on('words', onWordsChange);
        socket.on('rolesOfWords', onRolesChange);

        return () => {
            socket.off('words', onWordsChange);
            socket.off('rolesOfWords', onRolesChange);
        };
    }, []);

    return (
        <div className="board">
            {words.length ? words.map((word, index) => (
                <Card word={word} key={word} onClick={() => {
                    socket.emit('nextMove', index);
                }} index={index} role={roles[index]} />
            )) : <span>Loading...</span>}
        </div>
    );
}

export default Board;