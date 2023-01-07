import React, {useEffect, useState, useRef} from 'react';
import { io, Socket } from "socket.io-client";
import './styles/App.scss';
import Card from "./components/Card";
import ServerToClientEvents from "./types/ServerToClientEvents";
import ClientToServerEvents from "./types/ClientToServerEvents";

const App = () => {
    const [words, setWords] = useState<Array<string>>([]);
    const [roles, setRoles] = useState<Array<string>>([]);

    const socketRef = useRef<Socket<ClientToServerEvents, ServerToClientEvents>>();

    useEffect(() => {
        socketRef.current = io();

        socketRef.current.on('words', (words) => {
            setWords(words);
        });
        socketRef.current.on('roles', (roles) => {
            setRoles(roles);
        });
    }, []);

    return (
    <div className="board">
        {words.length ? words.map((word:string, index: number) => (
            <Card word={word} key={word} onClick={() => {
                socketRef.current?.emit('checkCardTeam', index);
            }} index={index} role={roles[index]} />
        )) : <span>Loading...</span>}
    </div>
  );
}

export default App;
