import React, {useEffect, useState} from "react";
import Board from "../components/Board";

const Game = () => {
    const [gameIsStarted, setGameIsStarted] = useState(false);
    const [nickname, setNickname] = useState('');
    const [nicknameInLocalstorage, setNicknameInLocalstorage] = useState(!!localStorage.getItem('nickname'));

    useEffect(() => {
        localStorage.setItem('nickname', nickname);
    }, [nicknameInLocalstorage])

    const setRole = async (id: string, role: string) => {
        const res = await fetch('http://localhost:8000/setRole', {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({user: id, role})
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
                                setRole(nickname, 'red').then(r => {console.log(r)});

                            }}>Join as spymaster for red team
                            </button>
                            <button onClick={() => {
                                setRole(nickname,'blue').then(r => {console.log(r)});
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
                            <button>Create game</button>
                        </form>
                    }
                </>
            }
        </>
    )
}

export default Game