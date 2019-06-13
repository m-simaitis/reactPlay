import React, {Component, useState, useEffect} from "react";
import regeneratorRuntime from "regenerator-runtime";
import {hot} from "react-hot-loader";
import "./App.less";

const StarsDisplay = props => {
    return (
        utils.range(1, props.starCount).map(starId =>
            <div key={starId} className='star'/>
        )

    );
};

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

const useGameState = () => {
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);

    useEffect(() => {
        if (secondsLeft > 0 && availableNums.length > 0) {
            const timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);
            return () => clearTimeout(timerId)

        }
    });

    const setGameState = (newCandidatesNums) => {
        if (utils.sum(newCandidatesNums) !== stars) {
            setCandidateNums(newCandidatesNums);
        } else {
            const newAvailableNums = availableNums.filter(
                nr => !newCandidatesNums.includes(nr)
            );
            setStars(utils.randomSumIn(newAvailableNums, 9));
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }
    };
    return {stars, availableNums, candidateNums, secondsLeft, setGameState}
};

const Game = props => {
    const {
        stars,
        availableNums,
        candidateNums,
        secondsLeft,
        setGameState
    } = useGameState();

    const candidatesAreWrong = utils.sum(candidateNums) > stars;

    const gameStatus = availableNums.length === 0
        ? 'won'
        : secondsLeft === 0 ? 'lost' : 'active';

    const numberStatus = (number) => {
        if (!availableNums.includes(number)) {
            return 'used';
        }
        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }
        return 'available'
    };

    const onNumberClick = (number, currentStatus) => {
        if (currentStatus === 'used' || gameStatus !== 'active') {
            return
        }
        const newCandidatesNums =
            currentStatus === 'available'
                ? candidateNums.concat(number)
                : candidateNums.filter(cn => cn !== number);

        setGameState(newCandidatesNums);
    };

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    {gameStatus === 'active'
                        ? (<StarsDisplay starCount={stars}/>)
                        : (<PlayAgain status={gameStatus} onClick={props.startNewGame}/>)
                    }
                </div>
                <div className="right">
                    {utils.range(1, 9).map(nr => (
                        <PlayNumber
                            status={numberStatus(nr)}
                            key={nr}
                            nr={nr}
                            onClick={onNumberClick}
                        />
                    ))}
                </div>
            </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
};

const App = () => {
    const [gameId, setGameId] = useState(1);
    return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)}/>
};

// Color Theme
const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
};

// Math science
const utils = {
    // Sum an array
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

    // create an array of numbers between min and max (edges included)
    range: (min, max) => Array.from({length: max - min + 1}, (_, i) => min + i),

    // pick a random number between min and max (edges included)
    random: (min, max) => min + Math.floor(max * Math.random()),

    // Given an array of numbers and a max...
    // Pick a random sum (< max) from the set of all available sums in arr
    randomSumIn: (arr, max) => {
        const sets = [[]];
        const sums = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0, len = sets.length; j < len; j++) {
                const candidateSet = sets[j].concat(arr[i]);
                const candidateSum = utils.sum(candidateSet);
                if (candidateSum <= max) {
                    sets.push(candidateSet);
                    sums.push(candidateSum);
                }
            }
        }
        return sums[utils.random(0, sums.length)];
    },
};

export default hot(module)(App);