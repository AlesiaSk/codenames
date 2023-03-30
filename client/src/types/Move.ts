import Clue from "./Clue";
import {Team} from "./Player";

export enum PlayerMoveType {
  GUESSING = "GUESSING",
  END_GUESSING = "END_GUESSING",
  GIVE_CLUE = "GIVE_CLUE"
}

export enum GameMoveType {
  GIVE_CLUE = "GIVE_CLUE",
  GUESSING = "GUESSING"
}

export interface GiveClueMove {
  type: PlayerMoveType.GIVE_CLUE;
  clue: Clue;
}

export interface GuessingMove {
  type: PlayerMoveType.GUESSING;
  wordIndex: number;
}

export interface EndGuessingMove {
  type: PlayerMoveType.END_GUESSING;
}

export interface GameMove {
  type: GameMoveType;
  team: Team;
}

export type PlayerMove = GiveClueMove | GuessingMove | EndGuessingMove;
