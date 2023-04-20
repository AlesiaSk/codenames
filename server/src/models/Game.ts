import Player, {PlayerId, Role, Team} from "./Player";
import {GameMove, PlayerMove} from "../types/Move";
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
    this.nextMove = { type: "GIVE_CLUE", team: Team.RED };
  }

  private addSpymaster(player: Player) {
    this.spymasters.set(player.id, player);
  }

  addPlayer(player: Player) {
    this.players.set(player.id, player);

    if (player.role === Role.SPYMASTER) {
      this.addSpymaster(player);
    }
  }

  getPlayer(playerId: PlayerId) {
    return this.players.get(playerId);
  }

  move(playerId: PlayerId, playerMove: PlayerMove) {
    const player = this.getPlayer(playerId);

    if (!this.isMoveValid(playerId, playerMove) || !player) {
      return false;
    }

    switch(playerMove.type) {
      case "GIVE_CLUE":
        this.currentClue = playerMove.clue;
        this.nextMove = { type: "GUESSING", team: player.team };
        break;
      case "END_GUESSING":
        this.nextMove = {
          type: "GIVE_CLUE",
          team: player.team === Team.RED ? Team.BLUE : Team.RED,
        };
        break;
      case "GUESSING":
        this.currentBoard[playerMove.wordIndex] =
          this.rolesOfWords[playerMove.wordIndex];
        this.nextMove = { type: "GUESSING", team: player.team };
        break;
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
          playerMove.type === "END_GUESSING"))
    );
  }
}

export default Game;
