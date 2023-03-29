import React from "react";

import Card from "./Card";
import ClueForm from "./ClueForm";

import GameState from "../types/GameState";
import Player from "../types/Player";

import {operativeMove, endGuessing} from "../handlers/moveHandlers";

interface BoardProps {
  player: Player;
  playerId: string,
  currentGameState: GameState;
  rolesOfWords: Array<string>;
}

const Board = ({ currentGameState, rolesOfWords, player, playerId }: BoardProps) => {
  const { words, currentBoard, nextMove } = currentGameState;
  const isPlayerTeamMove = nextMove.team === player.team;

  return (
    <div className="board">
      {words.map((word, wordIndex) => (
        <Card
          key={word}
          word={word}
          role={currentBoard[wordIndex]}
          highlight={rolesOfWords[wordIndex]}
          disabled={!isPlayerTeamMove || nextMove.type !== "GUESSING" || player.role !== "OPERATIVE" }
          onClick={() => operativeMove(playerId, wordIndex)}
        />
      ))}
      {isPlayerTeamMove && (
        <>
          {nextMove.type === "GIVE_CLUE" && player.role === "SPYMASTER" && <ClueForm playerId={playerId} />}
          {nextMove.type === "GUESSING" && player.role === "OPERATIVE" && (
            <button type="button" onClick={() => endGuessing(playerId)}>End guessing</button>
          )}
        </>
      )}
    </div>
  );
};

export default Board;