import React, { useEffect, useState } from "react";
import Board from "../../components/Board";
import GameState from "../../types/GameState";
import Player from "../../types/Player";

import { socket } from "../../socket";
import { useNavigate, useParams } from "react-router-dom";
import JoinGameForm from "../../components/JoinGameForm";
import Lobby from "../../components/Lobby";

interface RestoreGameConnectionParams {
  gameState: GameState;
  player: Player;
  players: Array<Player>;
  rolesOfWords: Array<string>;
  error: string;
}

function GameInitializer() {
  const { id: gameId } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<Player>();
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [currentGameState, setCurrentGameState] = useState<GameState>();
  const [rolesOfWords, setRolesOfWords] = useState<Array<string>>([]);
  const [playerId, setPlayerId] = useState(() =>
    sessionStorage.getItem(`game:${gameId}`)
  );

  useEffect(() => {
    function handleGameMove(nextGameState: GameState) {
      setCurrentGameState(nextGameState);
    }

    function handleRolesOfWords(roles: Array<string>) {
      setRolesOfWords(roles);
    }

    socket.on("gameMove", handleGameMove);
    socket.on("rolesOfWords", handleRolesOfWords);

    return () => {
      socket.off("gameMove", handleGameMove);
      socket.off("rolesOfWords", handleRolesOfWords);
    };
  }, []);

  useEffect(() => {
    if (playerId && !player) {
      socket.emit(
        "restoreGameConnection",
        { gameId, playerId },
        ({
          gameState,
          rolesOfWords,
          player,
          players,
          error,
        }: RestoreGameConnectionParams) => {
          if (error) {
            navigate("/error");
          }

          setPlayer(player);
          setRolesOfWords(rolesOfWords);
          setPlayers(players);

          if (gameState.isStarted) {
            setCurrentGameState(gameState);
          }
        }
      );
    }
  }, [gameId, navigate, player, playerId]);

  if (!playerId || !player) {
    return <JoinGameForm setPlayerId={setPlayerId} />;
  }

  if (player && !currentGameState) {
    return (
      <Lobby
        playerId={playerId}
        gamePlayers={players}
        onTeamJoined={({ team, role }) => {
          setPlayer({ ...player, role, team });
        }}
      />
    );
  }

  if (player && currentGameState) {
    return (
      <Board
        currentGameState={currentGameState}
        player={player}
        playerId={playerId}
        rolesOfWords={rolesOfWords}
      />
    );
  }

  return <span>Restoring session...</span>;
}

export default GameInitializer;
