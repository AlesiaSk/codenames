import React, {useState} from "react";
import Board from "../components/Board";

const Game = () => {
    const [gameIsStarted, setGameIsStarted] = useState(false)
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
                    <button onClick={() => {
                        setRole('alesia', 'red').then(r => {console.log(r)});

                    }}>Join as spymaster for red team
                    </button>
                    <button onClick={() => {
                        setRole('toli','blue').then(r => {console.log(r)});
                    }}>Join as spymaster for blue team
                    </button>
                    <button onClick={() => {
                        setGameIsStarted(true)
                    }}>Start the game
                    </button>
                </>
            }
        </>
    )
}

export default Game