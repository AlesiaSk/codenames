import React, { useEffect, useState } from "react";
import Player, { Role, Team } from "../types/Player";
import "../styles/Lobby.scss";
import { socket } from "../socket";

interface LobbyProps {
  playerId: string;
  gamePlayers: Array<Player>;
}

function Lobby({ playerId, gamePlayers }: LobbyProps) {
  const [players, setPlayers] = useState<Array<Player>>(gamePlayers);
  function handleJoinTeam(team: Team, role: Role) {
    socket.emit("joinTeam", { playerId, team, role });
  }

  useEffect(() => {
    function onGamePlayers(currentPlayers: Array<Player>) {
      setPlayers(currentPlayers);
    }

    socket.on("gamePlayers", onGamePlayers);
  }, []);

  return (
    <div className="lobby">
      <div className="lobby__team-wrapper">
        <div className="lobby__team lobby__team-red">
          <p>Red team</p>
          <button
            className="primary-button"
            onClick={() => handleJoinTeam(Team.RED, Role.SPYMASTER)}
          >
            Join as a spymaster
          </button>
          <button
            className="primary-button"
            onClick={() => handleJoinTeam(Team.RED, Role.OPERATIVE)}
          >
            Join as an operative
          </button>
        </div>
        <div className="lobby__team lobby__team-blue">
          <p>Blue team</p>
          <button
            className="primary-button"
            onClick={() => handleJoinTeam(Team.BLUE, Role.SPYMASTER)}
          >
            Join as a spymaster
          </button>
          <button
            className="primary-button"
            onClick={() => handleJoinTeam(Team.BLUE, Role.OPERATIVE)}
          >
            Join as an operative
          </button>
        </div>
      </div>
      {players.map((player) => (
        <div key={player.id}>
          <p>{player.nickname}</p>
          <p>{player.role}</p>
          <p>{player.team}</p>
        </div>
      ))}
      <button
        className="primary-button"
        type="button"
        onClick={() => socket.emit("startGame")}
      >
        Start
      </button>
    </div>
  );
}

export default Lobby;
