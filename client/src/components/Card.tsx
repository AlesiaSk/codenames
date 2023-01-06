import React from 'react';
import '../styles/Card.scss';

interface Props {
    word: string
}

const Card = ({word}: Props) => {
    return (
        <div className="card-wrapper">
            <span>{word}</span>
        </div>
    );
}

export default Card;
