import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const [nickname, setNickname] = useState('');

    const getRoomId = async () => {
        const res = await fetch('http://localhost:8000/roomId').then(res => res.json());
        return res.id;
    }

    return (
        <form onSubmit={async (e) => {
            e.preventDefault();
            const roomId = await getRoomId();
            if(roomId) {
                navigate(`/${roomId}`);
            }
        }}>
            <label>
                Nickname
                <input name="nickname" value={nickname} onChange={ e => {setNickname(e.target.value)}} />
            </label>
            <button>Create game</button>
        </form>
    )
}

export default Home