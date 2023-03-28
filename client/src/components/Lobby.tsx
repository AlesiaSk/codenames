import React from "react";
import {useParams} from "react-router-dom";
import {socket} from "../socket";
import UserData from "../types/UserData";

const joinGame = (nickname: string, role: string, team: string, gameId?: string) => {
    const playerId = sessionStorage.getItem(`game:${gameId}`);

    if(playerId) {
        socket.emit("joinGame", {gameId, playerId, nickname, role, team});
    } else {
        socket.emit("joinGame", {gameId, nickname, role, team}, (userId: string) => {
            sessionStorage.setItem(`game:${gameId}`, userId);
        });
    }
    socket.emit("startGame");
    console.log('game is started')
}

function Lobby () {
    const { id: gameId } = useParams();

    return (
        <form onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            // TODO: find a way how to fix it
            const data =  JSON.parse(JSON.stringify(Object.fromEntries(formData.entries())));
            const { nickname, role,  team }: UserData = data;
            joinGame(nickname, role, team, gameId);
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