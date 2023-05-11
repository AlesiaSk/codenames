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
      <form
        className="home-page__form"
        onSubmit={async (e) => {
          e.preventDefault();
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
        <label htmlFor="nickname">Enter your nickname</label>
        <input required id="nickname" name="nickname" maxLength={20} />
        <button className="home-page__button primary-button">
          Create game
        </button>
      </form>
      <div className="home-page__helper">
        <img src={peep} className="home-page__helper-character" alt="Helper" />
        <div className="home-page__helper-info">
          <p className="home-page__helper-text">
            <TypedText text={text}>
              <>
                <a href="/rules">Yep!</a>
                <div className="arrow">
                  <div className="point"></div>
                </div>
              </>
            </TypedText>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
