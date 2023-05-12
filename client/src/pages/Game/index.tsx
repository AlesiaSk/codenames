import React, {useEffect, useState} from "react";
import {socket} from "../../socket";
import {useNavigate, useParams} from "react-router-dom";
import GameInitializer from "./GameInitializer";

function Game() {
  const { id: gameId } = useParams();
  const navigate = useNavigate();
  const [doesGameExist, setDoesGameExist] = useState(false);

  useEffect(() => {
    socket.emit("doesGameExist", gameId, ({ error }: { error: string }) => {
      if (error) {
        navigate("/error");
      }

      setDoesGameExist(true);
    });
  }, [gameId, navigate]);

  if (!doesGameExist) {
    return <span>Loading...</span>;
  }

  return <GameInitializer />;
}

export default Game;