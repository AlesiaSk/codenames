import React from "react";
import { useNavigate } from "react-router-dom";
import { GameAPI } from "../api/GameAPI";
import peep from "/peep.png";
import "../styles/Home.scss";
import TypedText from "../elements/TypedText";

function Home() {
  const navigate = useNavigate();
  const text =
    "Hi there! Welcome to Codenames. If you are ready to start just click create game button. If no I'm here to help you get started. Would you like me to explain the rules of the game?";

  return (
    <div className="home-page">
      <button
        className="home-page__button primary-button"
        type="button"
        onClick={async () => {
          try {
            const { id: roomId } = await GameAPI.create();
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
      <div className="home-page__helper">
        <img src={peep} className="home-page__helper-character" alt="Helper" />
        <div className="home-page__helper-info">
          <p className="home-page__helper-text">
            <TypedText text={text}>
              <a href="/rules">Yep!</a>
            </TypedText>
          </p>
          <div className="arrow">
            <div className="point"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
