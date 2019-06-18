import React, {useState,} from "react";
import regeneratorRuntime from "regenerator-runtime";
import {hot} from "react-hot-loader";
import "../styles/App.less";

import Game from './Game';

const StartMatch = () => {
    const [gameId, setGameId] = useState(1);
    return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)}/>
};

export default hot(module)(StartMatch);