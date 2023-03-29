import React from "react";
import { useNavigate } from "react-router-dom";
import { GameAPI } from "../api/GameAPI";

const Home = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={async () => {
        try{
          const { id: roomId} = await GameAPI.create();
          if (roomId) {
            navigate(`/${roomId}`);
          }
        } catch (e) {
          navigate(`/error`);
        }
      }}
    >
      Create game
    </button>
  );
};

export default Home;
