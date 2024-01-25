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
  const startSmallGridValues = Array.from({ length: 9 }, () =>
    Array(9).fill(null)
  );

  const startBigGridValues = Array(9).fill(null);

  const winMatches = [
    [0, 1, 2],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [winCombination, setWinCombination] = useState(Array(3).fill(null));

  const [smallGridValues, setSmallGridValues] = useState(startSmallGridValues);
  const [bigGridValues, setBigGridValues] = useState(startBigGridValues);

  const [isCrossTurn, setIsCrossTurn] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);

  const [crossScore, setCrossScore] = useState(0);
  const [circleScore, setCircleScore] = useState(0);

  let newCrossScore = crossScore;
  let newCircleScore = circleScore;

  const changeSmallGridValue = (gridIndex, itemIndex) => {
    if (smallGridValues[gridIndex][itemIndex] != null || isGameOver) return;

    const newSmallGridValues = smallGridValues;

    if (isCrossTurn) {
      newSmallGridValues[gridIndex][itemIndex] = 'cross';
    } else {
      newSmallGridValues[gridIndex][itemIndex] = 'circle';
    }

    checkSmallGrid(gridIndex);
    setIsCrossTurn(!isCrossTurn);
    setSmallGridValues(newSmallGridValues);
    checkGameOver();
  };

  const checkSmallGrid = (gridIndex) => {
    const currentGridValues = smallGridValues[gridIndex];

    for (let i = 0; i < winMatches.length; i++) {
      const firstCellIndex = winMatches[i][0];
      const secondCellIndex = winMatches[i][1];
      const thirdCellIndex = winMatches[i][2];

      if (
        currentGridValues[firstCellIndex] !== null &&
        currentGridValues[firstCellIndex] ===
          currentGridValues[secondCellIndex] &&
        currentGridValues[secondCellIndex] === currentGridValues[thirdCellIndex]
      ) {
        changeBigGridValue(gridIndex, currentGridValues[firstCellIndex]);
      }
    }
  };

  const changeBigGridValue = (gridIndex, sign) => {
    const newBigGridValues = bigGridValues;
    newBigGridValues[gridIndex] = sign;
    setBigGridValues(newBigGridValues);

    if (sign === 'cross') {
      newCrossScore++;
      setCrossScore(newCrossScore);
    } else {
      newCircleScore++;
      setCircleScore(newCircleScore);
    }

    checkBigGrid();
  };

  const checkBigGrid = () => {
    for (let i = 0; i < winMatches.length; i++) {
      const firstCellIndex = winMatches[i][0];
      const secondCellIndex = winMatches[i][1];
      const thirdCellIndex = winMatches[i][2];

      if (
        bigGridValues[firstCellIndex] !== null &&
        bigGridValues[firstCellIndex] === bigGridValues[secondCellIndex] &&
        bigGridValues[secondCellIndex] === bigGridValues[thirdCellIndex]
      ) {
        setWinCombination([
          firstCellIndex,
          secondCellIndex,
          thirdCellIndex,
        ]);

        bigGridWin(bigGridValues[firstCellIndex]);
      }
    }
  };

  const bigGridWin = (sign) => {
    if (sign === 'cross') {
      newCrossScore += 3;
      setCrossScore(newCrossScore);
    } else {
      newCircleScore += 3;
      setCircleScore(newCircleScore);
    }

    winConfetti();
    setIsGameOver(true);
  };

  const checkGameOver = () => {
    for (let i = 0; i < bigGridValues.length; i++) {
      for (let j = 0; j < smallGridValues[i].length; j++) {
        if (bigGridValues[i] !== null) break;
        if (smallGridValues[i][j] == null) return;
      }
    }

    setIsGameOver(true);
  };

  const restartGame = () => {
    setSmallGridValues(startSmallGridValues);
    setBigGridValues(startBigGridValues);

    setIsGameOver(false);
    setIsCrossTurn(true);
    setCircleScore(0);
    setCrossScore(0);
  };

  const winConfetti = () => {
    if (newCrossScore === newCircleScore) return;

    const jsConfetti = new JSConfetti();
    let confettiColor = '';

    if (newCrossScore > newCircleScore) {
      confettiColor = '#ef4040';
    } else {
      confettiColor = '#3559E0';
    }

    jsConfetti.addConfetti({
      confettiColors: [confettiColor],
      confettiRadius: 8,
      confettiNumber: 150,
    });
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
          <div
            className={`big-grid ${isGameOver ? 'game-over' : 'game-not-over'}`}
          >
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
        </div>
      </div>
      <PlayAgainBtn onClick={restartGame} />
    </>
  );
}

export default App;
