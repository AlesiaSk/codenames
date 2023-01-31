import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {io, Socket} from "socket.io-client";
import ClientToServerEvents from "../types/ClientToServerEvents";
import ServerToClientEvents from "../types/ServerToClientEvents";
import Card from "./Card";

interface roomProps {
    room?: string,
    index: number,
    name?: string
}

const Board = () => {
    const [words, setWords] = useState<Array<string>>([]);
    const [roles, setRoles] = useState<Array<string>>([]);
    const [socket, setSocket] = useState<Socket<ClientToServerEvents, ServerToClientEvents>>();
    const params = useParams();

    useEffect(() => {
        const s = io();
        console.log('params', params)
        setSocket(s);
        if(s) {
            // @ts-ignore
            s.emit("join_room", {room: params.id, name:'1'})
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
                    socket.emit('checkCardTeam', params.id, index);
                }} index={index} role={roles[index]} />
            )) : <span>Loading...</span>}
        </div>
    );
}

export default Board;