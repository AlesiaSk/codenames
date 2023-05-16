import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameInitializer from "./GameInitializer";
import { Role, Team } from "../../types/Player";
import { GameMoveType } from "../../types/Move";
import { describe, test, expect } from "vitest";

describe("<GameInitializer />", () => {
  const playerId = "player-id";

  test("renders start game button when currentGameState is not defined", async () => {
    const player = {
      id: playerId,
      nickname: "Player",
      role: Role.OPERATIVE,
      team: Team.RED,
    };
    const onGameStartMock = vi.fn();

    render(<GameInitializer />);
    expect(screen.queryByTestId("game-board")).not.toBeInTheDocument();

    const startGameButton = screen.getByTestId("start-game-button");
    await userEvent.click(startGameButton);
    expect(onGameStartMock).toHaveBeenCalledTimes(1);
  });

  test("renders board when currentGameState is defined", () => {
    const player = {
      id: playerId,
      nickname: "Player",
      role: Role.SPYMASTER,
      team: Team.RED,
    };
    const currentGameState = {
      isStarted: true,
      words: ["word1", "word2"],
      currentBoard: ["none", "red"],
      nextMove: {
        type: GameMoveType.GIVE_CLUE,
        team: Team.RED,
      },
    };

    render(<GameInitializer />);

    const gameBoard = screen.getByTestId("game-board");
    expect(gameBoard).toBeInTheDocument();
    expect(screen.queryByTestId("start-button")).not.toBeInTheDocument();
  });
});
