import Player, { PlayerId } from "./Player";
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
  public currentClue: Clue;

  constructor() {
    // Here will be logic for creating random set of words and random roles for them
    this.rolesOfWords = ["red", "blue", "black", "neutral", "red"];
    this.words = ["Test1", "Test2", "Test3", "Test4", "Test5"];
    this.currentBoard = new Array(5).fill("none");
    this.players = new Map<PlayerId, Player>();
    this.spymasters = new Map<PlayerId, Player>();
    this.isStarted = false;
    this.nextMove = { type: "GIVE_CLUE", team: "RED" };
  }

  private addSpymaster(player: Player) {
    this.spymasters.set(player.id, player);
  }

  addPlayer(player: Player) {
    this.players.set(player.id, player);

    if (player.role === "spymaster") {
      this.addSpymaster(player);
    }
  }

  getPlayer(playerId: PlayerId) {
    return this.players.get(playerId);
  }

  move(playerId: PlayerId, move: PlayerMove) {
    const player = this.getPlayer(playerId);

    if (!this.isMoveValid(playerId, move) || !player) {
      return false;
    }

    if (move.type === "GIVE_CLUE") {
      this.currentClue = move.clue;
      this.nextMove = { type: "GUESSING", team: player.team };
      return;
    }

    if (move.type === "GUESSING") {
      this.currentBoard[move.wordIndex] = this.rolesOfWords[move.wordIndex];
      this.nextMove = { type: "GUESS_MORE_OR_END_GUESSING", team: player.team };
      return;
    }

    if (move.type === "END_GUESSING") {
      console.log("END_GUESSING");
      this.nextMove = {
        type: "GIVE_CLUE",
        team: player.team === "RED" ? "BLUE" : "RED",
      };
      return;
    }
  }

  start() {
    this.isStarted = true;
  }

  isMoveValid(playerId: PlayerId, move: PlayerMove) {
    const player = this.getPlayer(playerId);
    return (
      player &&
      this.nextMove.team === player.team &&
      (this.nextMove.type === move.type ||
        ((this.nextMove.type === "GUESS_MORE_OR_END_GUESSING" ||
          this.nextMove.type === "GUESSING") &&
          move.type === "END_GUESSING"))
    );
  }
}

export default Game;
