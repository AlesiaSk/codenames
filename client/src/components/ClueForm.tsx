import React from "react";
import Clue from "../types/Clue";
import { onSpymasterMove } from "../handlers/moveHandlers";

const ClueForm = ({ playerId }: {playerId: string}) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries()) as Clue;
        const { association, numberOfWords } = data;
        onSpymasterMove(playerId, { association, numberOfWords });
      }}
    >
      <label htmlFor="association">Association</label>
      <input name="association" />
      <label htmlFor="association">Number of words</label>
      <input name="association" />
      <button>Give a clue</button>
    </form>
  );
};

export default ClueForm;
