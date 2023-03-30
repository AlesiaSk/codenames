import Clue from "./Clue";
import {Team} from "../models/Player";

export interface GiveClueMove {
  type: "GIVE_CLUE";
  clue: Clue;
}

export interface GuessingMove {
  type: "GUESSING";
  wordIndex: number;
}

export interface EndGuessingMove {
  type: "END_GUESSING";
}

export interface GameMove {
  type: "GIVE_CLUE" | "GUESSING";
  team: Team;
}

export type PlayerMove = GiveClueMove | GuessingMove | EndGuessingMove;
