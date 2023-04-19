import React from "react";
import Board from "../../components/Board";
import Player from "../../types/Player";
import GameState from "../../types/GameState";

interface GameProcessorProps {
  onGameStart: () => void,
  player: Player;
  playerId: string,
  rolesOfWords: Array<string>;
  currentGameState?: GameState;
}

function GameProcess({ currentGameState, player, rolesOfWords, playerId, onGameStart}: GameProcessorProps) {
  if (!currentGameState) {
    return (<button type="button" onClick={onGameStart} data-testid="start-game-button">
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

export default GameProcess;
