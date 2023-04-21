import React, { useState } from "react";
import Clue from "../types/Clue";
import { spymasterMove } from "../handlers/moveHandlers";

function ClueForm({ playerId }: { playerId: string }) {
  const [association, setAssociation] = useState('');
  const [numberOfWords, setNumberOfWords] = useState('1');
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const clue: Clue = {association, numberOfWords};
        spymasterMove(playerId, clue);
      }}
    >
      <label htmlFor="association-input">Association</label>
      <input id="association-input" type="text" value={association} onChange={(e) => {setAssociation(e.target.value)}} required />
      <label htmlFor="number-of-words-input">Number of words</label>
      <input
        id="number-of-words-input"
        type="number"
        min="1"
        max="12"
        value={numberOfWords}
        onChange={(e) => {
          setNumberOfWords(e.target.value)}}
        required
      />
      <button type="submit">Give a clue</button>
    </form>
  );
}

export default ClueForm;
