import React from "react";
import peep from "/peep.png";
import "../styles/Home.scss";
import TypedText from "../elements/TypedText";
import Player from "../types/Player";
import { socket } from "../socket";
import JoinGameForm from "../components/JoinGameForm";

function Home() {
  const text =
    "Hi there! Welcome to Codenames. If you are ready to start just click create game button. If no I'm here to help you get started. Would you like me to explain the rules of the game?";

  return (
    <div className="home-page">
      <JoinGameForm />
      <div className="home-page__helper">
        <img src={peep} className="home-page__helper-character" alt="Helper" />
        <div className="home-page__helper-info">
          <div className="home-page__helper-text">
            <TypedText text={text}>
              <>
                <a href="/rules">Yep!</a>
                <div className="arrow">
                  <div className="point"></div>
                </div>
              </>
            </TypedText>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
