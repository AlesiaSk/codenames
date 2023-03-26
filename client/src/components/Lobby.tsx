import React from "react";
import {useParams} from "react-router-dom";
import {socket} from "../socket";

interface UserData {
    nickname: string,
    role: string,
    team: string
}

function Lobby () {
    const { id: roomId } = useParams();

    const addPlayer = async (nickname: string, role: string, team: string) => {
        // TODO: add env file
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

        socket.emit("joinRoom", roomId, localStorage.nickname);
        socket.emit("startGame");

        return res.id;
    }

    return (
        <form onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const data =  Object.fromEntries(formData.entries());
            // @ts-ignore
            const { nickname, role,  team }: UserData = data;
            localStorage.setItem('nickname', nickname);
            await addPlayer(nickname, role, team);
        }}>
            <label>
                Nickname
                <input name="nickname" />
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
    )
}

export default Lobby;