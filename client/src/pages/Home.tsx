import React from "react";
import {useNavigate} from "react-router-dom";
import {GameAPI} from "../api/GameAPI";

// TODO: add ErrorBoundaries
async function createRoom() {
    const res = await GameAPI.create();
    return res.id;
}

const Home = () => {
    const navigate = useNavigate();

    return (
        <button onClick={async () => {
            const roomId = await createRoom();
            if(roomId) {
                navigate(`/${roomId}`);
            }
        }}>Create game</button>
    )
}

export default Home