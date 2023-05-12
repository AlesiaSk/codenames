import React from "react";
import { GameAPI } from "../api/GameAPI";
import Player from "../types/Player";
import { socket } from "../socket";
import { useNavigate, useParams } from "react-router-dom";

interface JoinGameFormProps {
  setPlayerId?: (id: string) => void;
}

function JoinGameForm({ setPlayerId }: JoinGameFormProps) {
  const navigate = useNavigate();
  const { id: gameId } = useParams();
  function handleJoinGame(player: Player, gameId: string) {
    socket.emit("joinGame", { gameId, ...player }, (playerId: string) => {
      sessionStorage.setItem(`game:${gameId}`, playerId);
      if (setPlayerId) {
        setPlayerId(playerId);
      }
    });
  }

  return (
    <form
      className="home-page__form"
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries()) as Player;
          if (!gameId) {
            const { id: roomId } = await GameAPI.create();
            if (roomId) {
              handleJoinGame(data, roomId);
              navigate(`/${roomId}`);
            }
            return;
          }
          handleJoinGame(data, gameId);
        } catch (e) {
          navigate(`/error`);
        }
      }}
    >
      <label htmlFor="nickname">Enter your nickname</label>
      <input
        required
        id="nickname"
        name="nickname"
        maxLength={20}
        autoComplete="on"
      />
      <button className="home-page__button primary-button">
        Join the game
      </button>
    </form>
  );
}

export default JoinGameForm;
