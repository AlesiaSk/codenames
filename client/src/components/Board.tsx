import React from "react";

import Card from "./Card";
import ClueForm from "./ClueForm";

import GameState from "../types/GameState";
import Player, {Role} from "../types/Player";

import {endGuessing, operativeMove} from "../handlers/moveHandlers";

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
    <div className="board" data-testid="game-board">
      <div className="cards-wrapper" data-testid="game-words">
        {words.map((word, wordIndex) => (
          <Card
            key={word}
            word={word}
            role={currentBoard[wordIndex]}
            highlight={rolesOfWords[wordIndex]}
            disabled={!isPlayerTeamMove || nextMove.type !== "GUESSING" || player.role !== Role.OPERATIVE }
            onClick={() => operativeMove(playerId, wordIndex)}
          />
        ))}
      </div>
      {isPlayerTeamMove && (
        <>
          {nextMove.type === "GIVE_CLUE" && player.role === Role.SPYMASTER && <ClueForm playerId={playerId} />}
          {nextMove.type === "GUESSING" && player.role === Role.OPERATIVE && (
            <button type="button" onClick={() => endGuessing(playerId)}>End guessing</button>
          )}
        </>
      )}
    </div>
  );
};

export default Board;