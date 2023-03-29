import Clue from "./Clue";

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
  team: "RED" | "BLUE";
}

export type PlayerMove = GiveClueMove | GuessingMove | EndGuessingMove;
