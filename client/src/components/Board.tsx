import React, {useEffect, useState} from 'react';
import { Socket} from "socket.io-client";
import ClientToServerEvents from "../types/ClientToServerEvents";
import ServerToClientEvents from "../types/ServerToClientEvents";
import Card from "./Card";

interface Props {
    socket: Socket<ClientToServerEvents, ServerToClientEvents>
}

const Board = ({socket}: Props) => {
    const [words, setWords] = useState<Array<string>>([]);
    const [roles, setRoles] = useState<Array<string>>([]);

    useEffect(() => {
        socket.on('words', (words) => {
            setWords(words);
        });
        socket.on('roles', (roles) => {
            setRoles(roles);
        });
    }, []);

    return (
        <div className="board">
            {words.length ? words.map((word:string, index: number) => (
                <Card word={word} key={word} onClick={() => {
                    socket.emit('checkCardTeam', index);
                }} index={index} role={roles[index]} />
            )) : <span>Loading...</span>}
        </div>
    );
}

export default Board;