import React from "react";
import Clue from "../types/Clue";
import { spymasterMove } from "../handlers/moveHandlers";

const ClueForm = ({ playerId }: {playerId: string}) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const clue = Object.fromEntries(formData.entries()) as Clue;
        spymasterMove(playerId, clue);
      }}
    >
      <label htmlFor="association-input">Association</label>
      <input id="association-input" type="text" />
      <label htmlFor="number-of-words-input">Number of words</label>
      <input id="number-of-words-input" type="number" />
      <button type="submit">Give a clue</button>
    </form>
  );
};

export default ClueForm;
