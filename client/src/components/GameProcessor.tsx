import React from "react";
import Board from "./Board";
import Player from "../types/Player";
import GameState from "../types/GameState";

interface GameProcessorProps {
  onGameStart: () => void,
  player: Player;
  playerId: string,
  rolesOfWords: Array<string>;
  currentGameState?: GameState;
}

function GameProcessor({ currentGameState, player, rolesOfWords, playerId, onGameStart}: GameProcessorProps) {
  if (!currentGameState) {
    return (<button type="button" onClick={onGameStart}>
      Start the game
    </button>);
  }

  return (
    <Board
      playerId={playerId}
      player={player}
      currentGameState={currentGameState}
      rolesOfWords={rolesOfWords}
    />
  )
}

export default GameProcessor;
