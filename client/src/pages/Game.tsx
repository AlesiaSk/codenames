import React, {useState} from "react";
import Board from "../components/Board";
import { useParams } from "react-router-dom";

const Game = () => {
    const [gameIsStarted, setGameIsStarted] = useState(false);
    const [nickname, setNickname] = useState('');
    const [playerRole, setPlayerRole] = useState('');
    const [nicknameInLocalstorage, setNicknameInLocalstorage] = useState(!!localStorage.getItem('nickname'));
    const { id: roomId } = useParams();

    const addPlayer = async (nickname: string, role: string, team: string) => {
        console.log('roomId', roomId)
        const res = await fetch('http://localhost:8000/addPlayer', {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({nickname, role, team, roomId})
        }).then(res => res.json());
        return res.id;
    }

    return (
        <>
            { gameIsStarted ?
                <Board playerRole={playerRole} /> :
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    setGameIsStarted(true);
                    const form = e.target;
                    // @ts-ignore
                    const { nickname: name, role,  team } = Object.fromEntries(new FormData(form));
                    localStorage.setItem('nickname', nickname);
                    // @ts-ignore
                    setPlayerRole(role);
                    // @ts-ignore
                    await addPlayer(name, role, team);
                    setNicknameInLocalstorage(true);
                }}>
                    <label>
                        Nickname
                        <input name="nickname" value={nickname} onChange={e => {
                            setNickname(e.target.value)
                        }}/>
                    </label>
                    <p>
                        Team:
                        <label><input type="radio" name="team" value="red" /> Red </label>
                        <label><input type="radio" name="team" value="blue" defaultChecked={true} /> Blue </label>
                    </p>
                    <p>
                        Role:
                        <label><input type="radio" name="role" value="spymaster" /> Spymaster </label>
                        <label><input type="radio" name="role" value="operative" defaultChecked={true} /> Operative </label>
                    </p>
                    <button>Join the game</button>
                </form>
            }
        </>
    )
}

export default Game