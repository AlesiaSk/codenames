import React, {useEffect, useRef, useState} from 'react';
import { io, Socket } from "socket.io-client";
import './styles/App.scss';
import ServerToClientEvents from "./types/ServerToClientEvents";
import ClientToServerEvents from "./types/ClientToServerEvents";
import Board from "./components/Board";

const App = () => {
    const [socket, setSocket] = useState<Socket<ClientToServerEvents, ServerToClientEvents>>();

    useEffect(() => {
        setSocket(io());
    }, []);

    return (
        <>
            {
                socket ?
                    <Board socket={socket} />
                    :
                    <p>Loading...</p>
            }

        </>

  );
}

export default App;
