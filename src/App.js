import './App.css';

import React, { useState } from 'react';
import JSConfetti from 'js-confetti';

import Rules from './components/Rules/Rules';
import Score from './components/Score';
import SmallGridItems from './components/SmallGridItems';
import BigGridCross from './components/BigGridCross';
import BigGridCircle from './components/BigGridCirle';
import PlayAgainBtn from './components/PlayAgainBtn/PlayAgainBtn';

function App() {
  const startSmallGridValues = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ];

  const startBigGridValues = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];

  const [smallGridValues, setSmallGridValues] = useState(startSmallGridValues);
  const [bigGridValues, setBigGridValues] = useState(startBigGridValues);

  const [isCrossTurn, setIsCrossTurn] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);

  const [crossScore, setCrossScore] = useState(0);
  const [circleScore, setCircleScore] = useState(0);

  const checkGameOver = () => {
    for (let i = 0; i < bigGridValues.length; i++) {
      for (let j = 0; j < smallGridValues[i].length; j++) {
        if (bigGridValues[i] !== null) break;
        if (smallGridValues[i][j] == null) return;
      }
    }

    win();
  };

  const win = (newCrossScore = crossScore, newCircleScore = circleScore) => {
    setIsGameOver(true);
    const jsConfetti = new JSConfetti();
    let confettiColor = '#65B741';

    if (crossScore > circleScore) {
      confettiColor = 'rgb(239,64,64)';
    } else if (crossScore < circleScore) {
      confettiColor = 'rgb(53,89,224)';
    }

    jsConfetti.addConfetti({
      confettiColors: [confettiColor],
      confettiRadius: 6,
      confettiNumber: 500,
    });
  };

  const bigGridTaken = (sign) => {
    if (sign === 'cross') {
      setCrossScore(crossScore + 3);
    } else {
      setCircleScore(circleScore + 3);
    }

    setIsGameOver(true);
  };

  const checkBigGrid = () => {
    if (
      bigGridValues[0] !== null &&
      bigGridValues[0] === bigGridValues[1] &&
      bigGridValues[1] === bigGridValues[2]
    ) {
      bigGridTaken(bigGridValues[0]);
    } else if (
      bigGridValues[0] != null &&
      bigGridValues[0] === bigGridValues[3] &&
      bigGridValues[3] === bigGridValues[6]
    ) {
      bigGridTaken(bigGridValues[0]);
    } else if (
      bigGridValues[1] !== null &&
      bigGridValues[1] === bigGridValues[4] &&
      bigGridValues[4] === bigGridValues[7]
    ) {
      bigGridTaken(bigGridValues[1]);
    } else if (
      bigGridValues[2] !== null &&
      bigGridValues[2] === bigGridValues[5] &&
      bigGridValues[5] === bigGridValues[8]
    ) {
      bigGridTaken(bigGridValues[2]);
    } else if (
      bigGridValues[3] !== null &&
      bigGridValues[3] === bigGridValues[4] &&
      bigGridValues[4] === bigGridValues[5]
    ) {
      bigGridTaken(bigGridValues[3]);
    } else if (
      bigGridValues[6] !== null &&
      bigGridValues[6] === bigGridValues[7] &&
      bigGridValues[7] === bigGridValues[8]
    ) {
      bigGridTaken(bigGridValues[6]);
    } else if (
      bigGridValues[0] !== null &&
      bigGridValues[0] === bigGridValues[4] &&
      bigGridValues[4] === bigGridValues[8]
    ) {
      bigGridTaken(bigGridValues[0]);
    } else if (
      bigGridValues[2] !== null &&
      bigGridValues[2] === bigGridValues[4] &&
      bigGridValues[4] === bigGridValues[6]
    ) {
      bigGridTaken(bigGridValues[2]);
    }
  };

  const changeBigGridValue = (gridIndex, sign) => {
    const newBigGridValues = bigGridValues;
    newBigGridValues[gridIndex] = sign;

    if (sign === 'cross') setCrossScore(crossScore + 1);
    if (sign === 'circle') setCircleScore(circleScore + 1);

    setBigGridValues(newBigGridValues);

    checkBigGrid();
  };

  const checkSmallGrid = (gridIndex) => {
    const currentGridValues = smallGridValues[gridIndex];

    if (
      currentGridValues[0] !== null &&
      currentGridValues[0] === currentGridValues[1] &&
      currentGridValues[1] === currentGridValues[2]
    ) {
      changeBigGridValue(gridIndex, currentGridValues[0]);
    } else if (
      currentGridValues[0] != null &&
      currentGridValues[0] === currentGridValues[3] &&
      currentGridValues[3] === currentGridValues[6]
    ) {
      changeBigGridValue(gridIndex, currentGridValues[0]);
    } else if (
      currentGridValues[1] !== null &&
      currentGridValues[1] === currentGridValues[4] &&
      currentGridValues[4] === currentGridValues[7]
    ) {
      changeBigGridValue(gridIndex, currentGridValues[1]);
    } else if (
      currentGridValues[2] !== null &&
      currentGridValues[2] === currentGridValues[5] &&
      currentGridValues[5] === currentGridValues[8]
    ) {
      changeBigGridValue(gridIndex, currentGridValues[2]);
    } else if (
      currentGridValues[3] !== null &&
      currentGridValues[3] === currentGridValues[4] &&
      currentGridValues[4] === currentGridValues[5]
    ) {
      changeBigGridValue(gridIndex, currentGridValues[3]);
    } else if (
      currentGridValues[6] !== null &&
      currentGridValues[6] === currentGridValues[7] &&
      currentGridValues[7] === currentGridValues[8]
    ) {
      changeBigGridValue(gridIndex, currentGridValues[6]);
    } else if (
      currentGridValues[0] !== null &&
      currentGridValues[0] === currentGridValues[4] &&
      currentGridValues[4] === currentGridValues[8]
    ) {
      changeBigGridValue(gridIndex, currentGridValues[0]);
    } else if (
      currentGridValues[2] !== null &&
      currentGridValues[2] === currentGridValues[4] &&
      currentGridValues[4] === currentGridValues[6]
    ) {
      changeBigGridValue(gridIndex, currentGridValues[2]);
    }
  };

  const changeSmallGridValue = (gridIndex, itemIndex) => {
    if (smallGridValues[gridIndex][itemIndex] != null || isGameOver) return;

    const newSmallGridValues = smallGridValues;

    if (isCrossTurn) {
      newSmallGridValues[gridIndex][itemIndex] = 'cross';
      setIsCrossTurn(false);
    } else {
      newSmallGridValues[gridIndex][itemIndex] = 'circle';
    }

    checkSmallGrid(gridIndex);
    setIsCrossTurn(!isCrossTurn);
    setSmallGridValues(newSmallGridValues);
    checkGameOver();
  };

  const restartGame = () => {
    setSmallGridValues(startSmallGridValues);
    setBigGridValues(startBigGridValues);

    setIsGameOver(false);
    setIsCrossTurn(true);
    setCircleScore(0);
    setCrossScore(0);
  };

  return (
    <>
      <Rules />
      <h1 className='game-title'>Ultimate Tic-Tac-Toe</h1>
      <div className='game-container'>
        <div>
          <Score
            isCrossTurn={isCrossTurn}
            crossScore={crossScore}
            circleScore={circleScore}
            isGameOver={isGameOver}
          />
          <div className={`big-grid ${isGameOver ? 'game-over' : ''}`}>
            {smallGridValues.map((grid, gridIndex) => {
              return (
                <div
                  key={gridIndex}
                  className={
                    bigGridValues[gridIndex] === null ? 'small-grid' : ''
                  }
                >
                  {bigGridValues[gridIndex] === null && (
                    <SmallGridItems
                      grid={grid}
                      gridIndex={gridIndex}
                      setTurn={changeSmallGridValue}
                    />
                  )}
                  {bigGridValues[gridIndex] === 'cross' && <BigGridCross />}
                  {bigGridValues[gridIndex] === 'circle' && <BigGridCircle />}
                </div>
              );
            })}
          </div>
          <PlayAgainBtn onClick={restartGame} />
        </div>
      </div>
    </>
  );
}

export default App;
