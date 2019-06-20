import React from "react";

const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
};
const PlayNumber = props => {
    return (
        <button
            className="number"
            style={{backgroundColor: colors[props.status]}}
            onClick={() => props.onClick(props.nr, props.status)}
        >
            {props.nr}
        </button>
    );
};
export default PlayNumber