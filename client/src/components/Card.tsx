import React from "react";
import "../styles/Card.scss";

interface Props {
  word: string;
  role: string;
  onClick: () => void;
  disabled: boolean;
  highlight?: string;
}

function Card({ word, role, onClick, highlight, disabled }: Props) {
  return (
    <button
      className="card"
      data-role={role}
      data-highlight={highlight}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {word} - {role}
    </button>
  );
}

export default Card;
