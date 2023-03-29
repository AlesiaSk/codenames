import React from "react";

import Card from "./Card";
import ClueForm from "./ClueForm";

import GameState from "../types/GameState";
import Player from "../types/Player";

import {onOperativeMove, endGuessing} from "../handlers/moveHandlers";

interface BoardProps {
  player: Player;
  currentGameState: GameState;
  rolesOfWords: Array<string>;
}

const Board = ({ currentGameState, rolesOfWords, player }: BoardProps) => {
  const { words, currentBoard, players, nextMove } = currentGameState;

  return (
    <div className="board">
      {words.length ? (
        words.map((word, index) => (
          <Card
            word={word}
            key={word}
            onClick={() => {
              if (
                nextMove.type ===
                  ("GUESSING" || "GUESS_MORE_OR_END_GUESSING") &&
                player.role.toUpperCase() === "OPERATIVE" &&
                player.team === nextMove.team
              ) {
                onOperativeMove(player.id, index);
              }
            }}
            index={index}
            role={currentBoard[index]}
            highlight={rolesOfWords && rolesOfWords[index]}
          />
        ))
      ) : (
        <span>Loading...</span>
      )}
      {player.role.toUpperCase() === "SPYMASTER" &&
        nextMove.type === "GIVE_CLUE" &&
        nextMove.team === player.team && <ClueForm playerId={player.id} />}
      {(nextMove.type === "GUESSING" || nextMove.type === "GUESS_MORE_OR_END_GUESSING") &&
        player.role.toUpperCase() === "OPERATIVE" &&
        player.team === nextMove.team && (
          <button
            onClick={() => {
              endGuessing(player.id);
            }}
          >
            End guessing
          </button>
        )}
    </div>
  );
};

export default Board;