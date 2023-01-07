import React from 'react';
import '../styles/Card.scss';

interface Props {
    word: string,
    role: string,
    index: number,
    onClick: () => void
}

const Card = ({word, index, role, onClick}: Props) => {

    return (
        <div className={`card-wrapper ${role}`} onClick={onClick}>
            <span>{word} - {role}</span>
        </div>
    );
}

export default Card;
