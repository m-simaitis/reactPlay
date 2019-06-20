import React, {useState, useEffect} from "react";
import utils from '../math-utils';
import StarsDisplay from './StarsDisplay';
import PlayAgain from './PlayAgain';
import PlayNumber from './PlayNumber';

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

export default Game;