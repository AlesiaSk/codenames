import Player, { PlayerId, Role, Team } from "./Player";
import { GameMove, PlayerMove } from "../types/Move";
import Clue from "../types/Clue";

class Game {
  public words: Array<string>;
  public rolesOfWords: Array<string>;
  public currentBoard: Array<string>;
  public spymasters: Map<PlayerId, Player>;
  public players: Map<PlayerId, Player>;
  public isStarted: Boolean;
  public nextMove: GameMove;
  public currentClue?: Clue;
  public winner?: Team;
  readonly numberOfRedWords: number;

  constructor() {
    // Here will be logic for creating random set of words and random roles for them
    this.rolesOfWords = ["red", "blue", "black", "neutral", "red"];
    this.numberOfRedWords = this.rolesOfWords.filter(
      (word) => word === "red"
    ).length;
    this.words = ["Test1", "Test2", "Test3", "Test4", "Test5"];
    this.currentBoard = new Array(5).fill("none");
    this.players = new Map<PlayerId, Player>();
    this.spymasters = new Map<PlayerId, Player>();
    this.isStarted = false;
    this.nextMove = { type: "GIVE_CLUE", team: Team.RED };
  }

  addSpymaster(player: Player) {
    this.spymasters.set(player.id, player);
  }

  addPlayer(player: Player) {
    this.players.set(player.id, player);
  }

  getPlayer(playerId: PlayerId) {
    return this.players.get(playerId);
  }

  move(playerId: PlayerId, playerMove: PlayerMove) {
    const player = this.getPlayer(playerId);

    if (!this.isMoveValid(playerId, playerMove) || !player) {
      return false;
    }

    switch (playerMove.type) {
      case "GIVE_CLUE":
        this.currentClue = playerMove.clue;
        this.nextMove = { type: "GUESSING", team: player.team };
        break;
      case "END_GUESSING":
        this.currentClue = undefined;
        this.checkWin(player.team);
        this.nextMove = {
          type: "GIVE_CLUE",
          team: player.team === Team.RED ? Team.BLUE : Team.RED,
        };
        break;
      case "GUESSING":
        this.currentBoard[playerMove.wordIndex] =
          this.rolesOfWords[playerMove.wordIndex];
        this.checkWin(player.team);
        if (this.rolesOfWords[playerMove.wordIndex] === player.team) {
          this.nextMove = { type: "GUESSING", team: player.team };
        } else {
          this.nextMove = {
            type: "GIVE_CLUE",
            team: player.team === Team.RED ? Team.BLUE : Team.RED,
          };
        }
        break;
      case "GUESSING_AND_END_GUESSING":
        this.currentClue = undefined;
        this.currentBoard[playerMove.wordIndex] =
          this.rolesOfWords[playerMove.wordIndex];
        this.checkWin(player.team);
        this.nextMove = {
          type: "GIVE_CLUE",
          team: player.team === Team.RED ? Team.BLUE : Team.RED,
        };
        break;
    }
  }

  checkWin(currentTeam: Team) {
    // 7 neutral
    // 1 black
    // 8 blue
    // 9 red
    const isCurrentTeamRed = currentTeam === Team.RED;
    if (this.currentBoard.includes("black")) {
      this.winner = isCurrentTeamRed ? Team.BLUE : Team.RED;
      return;
    }
    let numberOfRedWords = 0;
    let numberOfBlueWords = 0;
    this.currentBoard.forEach((role) => {
      if (role === "red") {
        numberOfRedWords++;
      }
      if (role === "blue") {
        numberOfBlueWords++;
      }
    });
    if (isCurrentTeamRed && numberOfRedWords === this.numberOfRedWords) {
      this.winner = Team.RED;
      return Team.RED;
    }
    if (isCurrentTeamRed && numberOfBlueWords === this.numberOfRedWords - 1) {
      this.winner = Team.BLUE;
      return Team.BLUE;
    }
    if (!isCurrentTeamRed && numberOfBlueWords === this.numberOfRedWords - 1) {
      this.winner = Team.BLUE;
      return Team.BLUE;
    }
    if (!isCurrentTeamRed && numberOfRedWords === this.numberOfRedWords) {
      this.winner = Team.RED;
      return Team.RED;
    }
  }

  start() {
    this.isStarted = true;
  }

  isMoveValid(playerId: PlayerId, playerMove: PlayerMove) {
    const player = this.getPlayer(playerId);
    return (
      player &&
      this.nextMove.team === player.team &&
      (this.nextMove.type === playerMove.type ||
        (this.nextMove.type === "GUESSING" &&
          (playerMove.type === "END_GUESSING" ||
            playerMove.type === "GUESSING_AND_END_GUESSING")))
    );
  }
}

export default Game;
