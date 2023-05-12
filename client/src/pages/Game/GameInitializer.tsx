import React, { useEffect, useState } from "react";
import GameProcess from "./GameProcess";
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

  function handleJoinGame(player: Player) {
    socket.emit("joinGame", {...player });
  }

  useEffect(() => {
    function onGameMove(nextGameState: GameState) {
      setCurrentGameState(nextGameState);
    }

    function onRolesOfWords(roles: Array<string>) {
      setRolesOfWords(roles);
    }

    socket.on("gameMove", onGameMove);
    socket.on("rolesOfWords", onRolesOfWords);

    return () => {
      socket.off("gameMove", onGameMove);
      socket.off("rolesOfWords", onRolesOfWords);
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

  if(!player.role || !player.team) {
    return <Lobby playerId={playerId} gamePlayers={players} />;
  }

  if (player) {
    return (
      <GameProcess
        currentGameState={currentGameState}
        onGameStart={() => socket.emit("startGame")}
        player={player}
        playerId={playerId}
        rolesOfWords={rolesOfWords}
      />
    );
  }

  return <span>Restoring session...</span>;
}

export default GameInitializer;
