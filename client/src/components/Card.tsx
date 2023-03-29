import React from "react";
import "../styles/Card.scss";

interface Props {
  word: string;
  role: string;
  index: number;
  highlight: string;
  onClick: () => void;
}

const Card = ({ word, index, role, onClick, highlight }: Props) => {
  return (
    <div className={`card-wrapper ${role} ${highlight}`} onClick={onClick}>
      <span>
        {word} - {role}
      </span>
    </div>
  );
};

export default Card;
