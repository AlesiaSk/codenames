import React, { useEffect, useState } from "react";
import Lobby from "../../components/Lobby";
import GameProcess from "./GameProcess";
import GameState from "../../types/GameState";
import Player from "../../types/Player";

import { socket } from "../../socket";
import { useNavigate, useParams } from "react-router-dom";

interface RestoreGameConnectionParams {
  gameState: GameState;
  player: Player;
  rolesOfWords: Array<string>;
  error: string;
}

const GameInitializer = () => {
  const { id: gameId } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<Player>();
  const [currentGameState, setCurrentGameState] = useState<GameState>();
  const [rolesOfWords, setRolesOfWords] = useState<Array<string>>([]);
  const [playerId, setPlayerId] = useState(() => sessionStorage.getItem(`game:${gameId}`));

  function handleJoinGame(player: Player) {
    socket.emit("joinGame", { gameId, ...player }, (playerId: string) => {
      sessionStorage.setItem(`game:${gameId}`, playerId);
      setPlayer(player);
      setPlayerId(playerId);
    });
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
          error,
        }: RestoreGameConnectionParams) => {
          if (error) {
            navigate("/error");
          }

          setPlayer(player);
          setRolesOfWords(rolesOfWords);

          if (gameState.isStarted) {
            setCurrentGameState(gameState);
          }
        }
      );
    }
  }, [gameId, navigate, player, playerId]);

  if (!playerId) {
    return <Lobby onJoinGameSubmit={handleJoinGame} />;
  }

  if (player) {
    return (<GameProcess
      currentGameState={currentGameState}
      onGameStart={() => socket.emit("startGame")}
      player={player}
      playerId={playerId}
      rolesOfWords={rolesOfWords}
    />);
  }

  return <span>Restoring session...</span>;
};

export default GameInitializer;
