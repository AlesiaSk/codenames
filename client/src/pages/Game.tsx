import React, {useEffect, useState} from "react";
import Board from "../components/Board";
import { useParams } from "react-router-dom";

const Game = () => {
    const [gameIsStarted, setGameIsStarted] = useState(false);
    const [nickname, setNickname] = useState('');
    const [nicknameInLocalstorage, setNicknameInLocalstorage] = useState(!!localStorage.getItem('nickname'));
    const { id: roomId } = useParams();

    useEffect(() => {
        localStorage.setItem('nickname', nickname);
    }, [nicknameInLocalstorage])

    const setRole = async (nickname: string, role: string, team: string) => {
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
            {gameIsStarted ?
                <Board/> :
                <>
                    { nicknameInLocalstorage ?
                        <>
                            <button onClick={() => {
                                setRole(nickname, 'spymaster', 'red').then(r => {console.log(r)});

                            }}>Join as spymaster for red team
                            </button>
                            <button onClick={() => {
                                setRole(nickname, 'spymaster','blue').then(r => {console.log(r)});
                            }}>Join as spymaster for blue team
                            </button>
                            <button onClick={() => {
                                setGameIsStarted(true)
                            }}>Start the game
                            </button>
                        </> :
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            setNicknameInLocalstorage(true);
                        }}>
                            <label>
                                Nickname
                                <input name="nickname" value={nickname} onChange={e => {
                                    setNickname(e.target.value)
                                }}/>
                            </label>
                            <button>Join the game</button>
                        </form>
                    }
                </>
            }
        </>
    )
}

export default Game