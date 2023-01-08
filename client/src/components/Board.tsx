import React, {useEffect, useState} from 'react';
import {io, Socket} from "socket.io-client";
import ClientToServerEvents from "../types/ClientToServerEvents";
import ServerToClientEvents from "../types/ServerToClientEvents";
import Card from "./Card";

const Board = () => {
    const [words, setWords] = useState<Array<string>>([]);
    const [roles, setRoles] = useState<Array<string>>([]);
    const [socket, setSocket] = useState<Socket<ClientToServerEvents, ServerToClientEvents>>();

    useEffect(() => {
        const s = io();
        setSocket(s);
        if(s) {
            s.on('words', (words) => {
                setWords(words);
            });
            s.on('roles', (roles) => {
                setRoles(roles);
            });
        }
    }, []);

    return (
        <div className="board">
            {socket && words.length ? words.map((word:string, index: number) => (
                <Card word={word} key={word} onClick={() => {
                    socket.emit('checkCardTeam', index);
                }} index={index} role={roles[index]} />
            )) : <span>Loading...</span>}
        </div>
    );
}

export default Board;