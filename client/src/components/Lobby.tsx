import React from "react";
import {useParams} from "react-router-dom";
import {socket} from "../socket";
import UserData from "../types/UserData";
import {GameAPI} from "../api/GameAPI";

function Lobby () {
    const { id: roomId } = useParams();

    const addPlayer = async (nickname: string, role: string, team: string) => {
        await GameAPI.addPlayer({nickname, role, team, roomId});
        socket.emit("joinRoom", roomId, localStorage.nickname);
        socket.emit("startGame");
    }

    return (
        <form onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            // TODO: find a way how to fix it
            const data =  JSON.parse(JSON.stringify(Object.fromEntries(formData.entries())));
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