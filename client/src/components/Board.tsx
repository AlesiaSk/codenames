import React, { useRef } from "react";

import Card from "./Card";
import ClueForm from "./ClueForm";

import GameState from "../types/GameState";
import Player, { Role } from "../types/Player";

import { endGuessing } from "../handlers/moveHandlers";
import { socket } from "../socket";

interface BoardProps {
  player: Player;
  playerId: string;
  currentGameState: GameState;
  rolesOfWords: Array<string>;
}

function Board({
  currentGameState,
  rolesOfWords,
  playerId,
  player,
}: BoardProps) {
  const { words, currentBoard, nextMove, winner, currentClue, players } =
    currentGameState;
  const isPlayerTeamMove = nextMove.team === player.team;
  const isCardDisabled =
    !isPlayerTeamMove ||
    nextMove.type !== "GUESSING" ||
    player.role !== Role.OPERATIVE;
  const numberOfGuessedWords = useRef(0);
  console.log("nextMove", nextMove);
  console.log("player", player);

  function operativeMove(playerId: string, wordIndex: number) {
    if (
      numberOfGuessedWords.current.toString() === currentClue?.numberOfWords
    ) {
      socket.emit("playerMove", {
        playerId,
        move: {
          type: "GUESSING_AND_END_GUESSING",
          wordIndex,
        },
      });
      return;
    }
    socket.emit("playerMove", {
      playerId,
      move: {
        type: "GUESSING",
        wordIndex,
      },
    });
    numberOfGuessedWords.current++;
  }

  return (
    <div className="board" data-testid="game-board">
      {winner && <p>Thу winner is {winner} team</p>}
      {currentClue && (
        <p>
          CLUE - {currentClue.association}, NUMBER OF WORDS -{" "}
          {currentClue.numberOfWords}
        </p>
      )}
      <div className="cards-wrapper" data-testid="game-words">
        {words.map((word, wordIndex) => (
          <Card
            key={word}
            word={word}
            role={currentBoard[wordIndex]}
            highlight={rolesOfWords && rolesOfWords[wordIndex]}
            disabled={isCardDisabled}
            onClick={() => operativeMove(playerId, wordIndex)}
          />
        ))}
      </div>
      {isPlayerTeamMove && (
        <>
          {nextMove.type === "GIVE_CLUE" && player.role === Role.SPYMASTER && (
            <ClueForm playerId={playerId} />
          )}
          {nextMove.type === "GUESSING" && player.role === Role.OPERATIVE && (
            <button type="button" onClick={() => endGuessing(playerId)}>
              End guessing
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Board;
