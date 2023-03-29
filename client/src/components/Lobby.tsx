import React from "react";
import {useParams} from "react-router-dom";
import {socket} from "../socket";
import Player from "../types/Player";

interface LobbyProps {
    onGameJoined: (player: Player) => void
}

function Lobby ({ onGameJoined }: LobbyProps) {
    const { id: gameId } = useParams();

    return (
        <form onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries()) as Player;
            const { nickname, role, team } = data;
            const playerId = sessionStorage.getItem(`game:${gameId}`);

            if(playerId) {
                socket.emit("joinGame", {gameId, playerId, nickname, role, team});
            } else {
                socket.emit("joinGame", {gameId, nickname, role, team}, (playerId: string) => {
                    sessionStorage.setItem(`game:${gameId}`, playerId);
                    onGameJoined({ nickname, role, team, id: playerId });
                });
            }
            socket.emit("startGame");
        }}>
            <label>
                Nickname
                <input name="nickname" />
            </label>
            <p>
                Team:
                <label><input type="radio" name="team" value="RED" /> Red </label>
                <label><input type="radio" name="team" value="BLUE" defaultChecked={true} /> Blue </label>
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