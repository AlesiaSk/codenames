import React from "react";
import Player, {Role} from "../types/Player";

interface LobbyProps {
    onJoinGameSubmit: (player: Player) => void
}

function Lobby ({ onJoinGameSubmit }: LobbyProps) {
    return (
        <form onSubmit={e => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries()) as Player;
            onJoinGameSubmit(data);
        }}>
            <label>
                Nickname
                <input required name="nickname" maxLength={20} />
            </label>
            <p>
                Team:
                <label><input type="radio" name="team" value="RED" /> Red </label>
                <label><input type="radio" name="team" value="BLUE" defaultChecked={true} /> Blue </label>
            </p>
            <p>
                Role:
                <label><input type="radio" name="role" value={Role.SPYMASTER} /> Spymaster </label>
                <label><input type="radio" name="role" value={Role.OPERATIVE} defaultChecked={true} /> Operative </label>
            </p>
            <button type="submit">Join the game</button>
        </form>
    )
}

export default Lobby;