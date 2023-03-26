import React from "react";
import {useNavigate} from "react-router-dom";

// TODO: Rename to createRoom
async function getRoomId() {
    //TODO: add Error handler
    // rename this request to POST /rooms
    // add api folder
    const res = await fetch('http://localhost:8000/getRoomId').then(res => res.json());
    return res.id;
}

const Home = () => {
    const navigate = useNavigate();

    return (
        <button onClick={async () => {
            const roomId = await getRoomId();
            if(roomId) {
                navigate(`/${roomId}`);
            }
        }}>Create game</button>
    )
}

export default Home