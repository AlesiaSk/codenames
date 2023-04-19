import React from "react";
import { render, screen } from "@testing-library/react";
import Board from "./Board";
import { Role, Team } from "../types/Player";
import { GameMoveType } from "../types/Move";
import { describe, test, expect } from 'vitest';

describe("<Board />", () => {
  const playerId = "player-id";

  describe("renders correctly", () => {
    const player = {
      id: playerId,
      nickname: "Player",
      role: Role.SPYMASTER,
      team: Team.RED,
    };

    test("renders cards", () => {
      const currentGameState = {
        isStarted: true,
        words: ["word1", "word2", "word3"],
        currentBoard: ["none", "red", "blue"],
        nextMove: {
          type: GameMoveType.GIVE_CLUE,
          team: Team.RED,
        },
      };

      render(
        <Board
          playerId={playerId}
          player={player}
          rolesOfWords={[]}
          currentGameState={currentGameState}
        />
      );

      const cards = screen.getAllByTestId("game-card");

      expect(cards).toHaveLength(currentGameState.words.length);
    });

    test("renders words correctly", () => {
      const currentGameState = {
        isStarted: true,
        words: ["word1", "word2"],
        currentBoard: ["none", "red"],
        nextMove: {
          type: GameMoveType.GIVE_CLUE,
          team: Team.RED,
        },
      };

      render(
        <Board
          playerId={playerId}
          player={player}
          rolesOfWords={[]}
          currentGameState={currentGameState}
        />
      );

      const gameWords = screen.getByTestId("game-words");
      expect(gameWords).toMatchInlineSnapshot(`
        <div
          class="cards-wrapper"
          data-testid="game-words"
        >
          <button
            class="card"
            data-role="none"
            disabled=""
            type="button"
          >
            word1
             - 
            none
          </button>
          <button
            class="card"
            data-role="red"
            disabled=""
            type="button"
          >
            word2
             - 
            red
          </button>
        </div>
      `);
    });

    test("renders highlighted words correctly", () => {
      const currentGameState = {
        isStarted: true,
        words: ["word1", "word2"],
        currentBoard: ["none", "red"],
        nextMove: {
          type: GameMoveType.GIVE_CLUE,
          team: Team.RED,
        },
      };

      render(
        <Board
          playerId={playerId}
          player={player}
          rolesOfWords={["red", "blue"]}
          currentGameState={currentGameState}
        />
      );

      const gameWords = screen.getByTestId("game-words");
      expect(gameWords).toMatchInlineSnapshot(`
        <div
          class="cards-wrapper"
          data-testid="game-words"
        >
          <button
            class="card"
            data-highlight="red"
            data-role="none"
            disabled=""
            type="button"
          >
            word1
             - 
            none
          </button>
          <button
            class="card"
            data-highlight="blue"
            data-role="red"
            disabled=""
            type="button"
          >
            word2
             - 
            red
          </button>
        </div>
      `);
    });
  });

  describe("Player team: RED role: SPYMASTER", () => {
    const player = {
      id: playerId,
      nickname: "Player",
      role: Role.OPERATIVE,
      team: Team.RED,
    };

    test("words are not disabled when player moves and the player has role OPERATIVE", () => {
      const currentGameState = {
        isStarted: true,
        words: ["word1", "word2"],
        currentBoard: ["none", "red"],
        nextMove: {
          type: GameMoveType.GUESSING,
          team: Team.RED,
        },
      };

      render(
        <Board
          playerId={playerId}
          player={player}
          rolesOfWords={[]}
          currentGameState={currentGameState}
        />
      );

      const gameWords = screen.getByTestId("game-words");
      expect(gameWords).toMatchInlineSnapshot(`
        <div
          class="cards-wrapper"
          data-testid="game-words"
        >
          <button
            class="card"
            data-role="none"
            type="button"
          >
            word1
             - 
            none
          </button>
          <button
            class="card"
            data-role="red"
            type="button"
          >
            word2
             - 
            red
          </button>
        </div>
      `);
    });
  });
});
