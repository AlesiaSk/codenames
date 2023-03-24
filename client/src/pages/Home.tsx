import React from "react";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const getRoomId = async () => {
        const res = await fetch('http://localhost:8000/getRoomId').then(res => res.json());
        return res.id;
    }

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