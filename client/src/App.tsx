import React, {useEffect, useRef, useState} from 'react';
import { io, Socket } from "socket.io-client";
import './styles/App.scss';
import ServerToClientEvents from "./types/ServerToClientEvents";
import ClientToServerEvents from "./types/ClientToServerEvents";
import Board from "./components/Board";

const App = () => {
    const [socket, setSocket] = useState<Socket<ClientToServerEvents, ServerToClientEvents>>();
    const [roomId, setRoomId] = useState<string | undefined>();

    const getWords = async () => {
        const data = await fetch('http://localhost:8000/roomId').then(res => res.json());
        console.log('data', data)
        setRoomId(data.id);
    }

    useEffect(() => {
        setSocket(io());
    }, []);

    return (
        <>
            {
                socket ?
                    <button onClick={async () => {
                        await getWords();
                    }}>Create game {roomId && roomId}</button>
                    :
                    <p>Loading...</p>
            }

        </>

  );
}

export default App;
