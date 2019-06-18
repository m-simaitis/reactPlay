import React from "react";

const PlayAgain = props => {
    return (
        <div className="game-done">
            <div className="message"
                 style={{color: props.status === 'lost' ? 'red' : 'green'}}
            >
                {props.status === 'lost' ? 'Game Over' : 'You Won Mr.'}
            </div>
            <button onClick={props.onClick}>
                Play Again
            </button>
        </div>
    )
};

export default PlayAgain