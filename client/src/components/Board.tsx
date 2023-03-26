import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {io, Socket} from "socket.io-client";
import ClientToServerEvents from "../types/ClientToServerEvents";
import ServerToClientEvents from "../types/ServerToClientEvents";
import Card from "./Card";

type BoardProps = {
    playerRole: string;
};

const Board = ({ playerRole }: BoardProps) => {
    const [words, setWords] = useState<Array<string>>([]);
    const [roles, setRoles] = useState<Array<string>>([]);
    const [socket, setSocket] = useState<Socket<ClientToServerEvents, ServerToClientEvents>>();
    const params = useParams();

    useEffect(() => {
        const s = io();
        setSocket(s);
        if(s) {

            s.emit("join_room", {room: params.id, name: localStorage.nickname})
            s.on('words', (words) => {
                setWords(words);
                console.log('socket', s.id);
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
                    console.log('playerRole', playerRole)
                    if(playerRole === 'operative') {
                      socket.emit('checkCardTeam', params.id, index);
                    }
                }} index={index} role={roles[index]} />
            )) : <span>Loading...</span>}
        </div>
    );
}

export default Board;