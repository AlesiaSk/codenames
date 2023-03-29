import React from "react";
import "../styles/Card.scss";

interface Props {
  word: string;
  role: string;
  onClick: () => void;
  disabled: boolean;
  highlight?: string;
}

const Card = ({ word, role, onClick, highlight, disabled }: Props) => {
  return (
    <button
      className={`card-wrapper ${role} 
      ${highlight}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span>
        {word} - {role}
      </span>
    </button>
  );
};

export default Card;
