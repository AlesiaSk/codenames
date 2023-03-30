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
      <input id="association-input" type="text" required />
      <label htmlFor="number-of-words-input">Number of words</label>
      <input id="number-of-words-input" type="number" min="1" max="12" required />
      <button type="submit">Give a clue</button>
    </form>
  );
};

export default ClueForm;
