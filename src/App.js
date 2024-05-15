import './App.css';

import Score from './components/score/Score';
import Rules from './components/Rules/Rules';
import ResetButton from './components/reset-button/ResetButton';

import { useState } from 'react';
import JSConfetti from 'js-confetti';

import { ImCross } from 'react-icons/im';
import { FaCircleDot } from 'react-icons/fa6';

function App() {
  const jsConfetti = new JSConfetti();

  const [isGameOver, setIsGameOver] = useState(false);
  const [isCrossTurn, setIsCrossTurn] = useState(false);
  const [crossScore, setCrossScore] = useState(0);
  const [circleScore, setCircleScore] = useState(0);

  const [smallGridCells, setSmallGridCells] = useState([
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ]);

  const [bigGridCells, setBigGridCells] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const checkWin = (bigGridSigns, smallGridSigns) => {
    console.log(bigGridSigns);
    console.log();
    console.log(smallGridSigns);

    for (let i = 0; i < 9; i++) {
      if (bigGridSigns[i] !== null) continue;
      const currentGrid = smallGridSigns[i];

      for (let j = 0; j < 9; j++) {
        if (currentGrid[j] === null) return;
      }
    }

    setIsGameOver(true);
  };

  const checkSmallGrid = (smallGrids) => {
    const newBigGrids = [...bigGridCells];

    for (let i = 0; i < 9; i++) {
      if (bigGridCells[i] !== null) continue;

      let newCrossScore = crossScore;
      let newCircleScore = circleScore;

      // Check Rows
      for (let j = 0; j < 3; j++) {
        if (smallGrids[i][j * 3] === null) continue;
        if (
          smallGrids[i][j * 3] === smallGrids[i][j * 3 + 1] &&
          smallGrids[i][j * 3] === smallGrids[i][j * 3 + 2]
        ) {
          if (smallGrids[i][j * 3] === 'x') {
            newBigGrids[i] = 'x';
            newCrossScore = crossScore + 1;
            setCrossScore(newCrossScore);
          } else {
            newBigGrids[i] = 'o';
            newCircleScore = circleScore + 1;
            setCircleScore(newCircleScore);
          }

          checkBigGrid(newBigGrids, newCrossScore, newCircleScore);
          setBigGridCells(newBigGrids);
        }
      }

      // Check Columns
      for (let j = 0; j < 3; j++) {
        if (smallGrids[i][j] === null) continue;
        if (
          smallGrids[i][j] === smallGrids[i][j + 3] &&
          smallGrids[i][j] === smallGrids[i][j + 6]
        ) {
          if (smallGrids[i][j] === 'x') {
            newBigGrids[i] = 'x';
            newCrossScore = crossScore + 1;
            setCrossScore(newCrossScore);
          } else {
            newBigGrids[i] = 'o';
            newCircleScore = circleScore + 1;
            setCircleScore(newCircleScore);
          }

          checkBigGrid(newBigGrids, newCrossScore, newCircleScore);
          setBigGridCells(newBigGrids);
        }
      }

      // Check Oblique
      if (smallGrids[i][0] !== null) {
        if (
          smallGrids[i][0] === smallGrids[i][4] &&
          smallGrids[i][0] === smallGrids[i][8]
        ) {
          if (smallGrids[i][0] === 'x') {
            newBigGrids[i] = 'x';
            newCrossScore = crossScore + 1;
            setCrossScore(newCrossScore);
          } else {
            newBigGrids[i] = 'o';
            newCircleScore = circleScore + 1;
            setCircleScore(newCircleScore);
          }

          checkBigGrid(newBigGrids, newCrossScore, newCircleScore);
          setBigGridCells(newBigGrids);
        }
      }

      if (smallGrids[i][2] !== null) {
        if (
          smallGrids[i][2] === smallGrids[i][4] &&
          smallGrids[i][2] === smallGrids[i][6]
        ) {
          if (smallGrids[i][2] === 'x') {
            newBigGrids[i] = 'x';
            newCrossScore = crossScore + 1;
            setCrossScore(newCrossScore);
          } else {
            newBigGrids[i] = 'o';
            newCircleScore = circleScore + 1;
            setCircleScore(newCircleScore);
          }

          checkBigGrid(newBigGrids, newCrossScore, newCircleScore);
          setBigGridCells(newBigGrids);
        }
      }
    }

    checkWin(newBigGrids, smallGrids);
  };

  const checkBigGrid = (smallGrids, newCrossScore, newCircleScore) => {
    // Check Rows
    for (let i = 0; i < 3; i++) {
      if (smallGrids[i * 3] === null) continue;
      if (
        smallGrids[i * 3] === smallGrids[i * 3 + 1] &&
        smallGrids[i * 3] === smallGrids[i * 3 + 2]
      ) {
        if (smallGrids[i * 3] === 'x') {
          jsConfetti.addConfetti({
            confettiColors: ['#ff004d'],
            confettiRadius: 6,
            confettiNumber: 500,
          });
          setCrossScore(newCrossScore + 3);
        } else {
          jsConfetti.addConfetti({
            confettiColors: ['#378ce7'],
            confettiRadius: 6,
            confettiNumber: 500,
          });
          setCircleScore(newCircleScore + 3);
        }

        setIsGameOver(true);
      }
    }

    // Check Columns
    for (let i = 0; i < 3; i++) {
      if (smallGrids[i] === null) continue;
      if (
        smallGrids[i] === smallGrids[i + 3] &&
        smallGrids[i] === smallGrids[i + 6]
      ) {
        if (smallGrids[i] === 'x') {
          jsConfetti.addConfetti({
            confettiColors: ['#ff004d'],
            confettiRadius: 6,
            confettiNumber: 500,
          });
          setCrossScore(newCrossScore + 3);
        } else {
          jsConfetti.addConfetti({
            confettiColors: ['#378ce7'],
            confettiRadius: 6,
            confettiNumber: 500,
          });
          setCircleScore(newCircleScore + 3);
        }

        setIsGameOver(true);
      }
    }

    // Check Oblique
    if (smallGrids[0] !== null) {
      if (smallGrids[0] === smallGrids[4] && smallGrids[0] === smallGrids[8]) {
        if (smallGrids[0] === 'x') {
          jsConfetti.addConfetti({
            confettiColors: ['#ff004d'],
            confettiRadius: 6,
            confettiNumber: 500,
          });
          setCrossScore(newCrossScore + 3);
        } else {
          jsConfetti.addConfetti({
            confettiColors: ['#378ce7'],
            confettiRadius: 6,
            confettiNumber: 500,
          });
          setCircleScore(newCircleScore + 3);
        }

        setIsGameOver(true);
      }
    }

    if (smallGrids[2] !== null) {
      if (smallGrids[2] === smallGrids[4] && smallGrids[2] === smallGrids[6]) {
        if (smallGrids[2] === 'x') {
          jsConfetti.addConfetti({
            confettiColors: ['#ff004d'],
            confettiRadius: 6,
            confettiNumber: 500,
          });
          setCrossScore(newCrossScore + 3);
        } else {
          jsConfetti.addConfetti({
            confettiColors: ['#378ce7'],
            confettiRadius: 6,
            confettiNumber: 500,
          });
          setCircleScore(newCircleScore + 3);
        }

        setIsGameOver(true);
      }
    }
  };

  const resetGame = () => {
    setIsCrossTurn(false);
    setIsGameOver(false);
    setCrossScore(0);
    setCircleScore(0);

    setBigGridCells([null, null, null, null, null, null, null, null, null]);
    setSmallGridCells([
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
    ]);
  };

  return (
    <>
      <Rules />
      <ResetButton onClick={resetGame} />
      <h1>Ultimate Tic Tac Toe</h1>
      <Score
        isCrossTurn={isCrossTurn}
        circleScore={circleScore}
        crossScore={crossScore}
        isGameOver={isGameOver}
      />
      <ul className='grid-big'>
        {smallGridCells.map((smallGrid, smallGridIndex) => {
          return (
            <li
              key={smallGridIndex}
              className={`grid-small ${
                bigGridCells[smallGridIndex] === null && !isGameOver
                  ? 'free'
                  : ''
              }`}
            >
              <ul>
                <div
                  className={`big-grid-sign cross ${
                    bigGridCells[smallGridIndex] === 'x' ? 'active' : ''
                  }`}
                >
                  <ImCross />
                </div>
                <div
                  className={`big-grid-sign circle ${
                    bigGridCells[smallGridIndex] === 'o' ? 'active' : ''
                  }`}
                >
                  <FaCircleDot />
                </div>
                {smallGrid.map((cell, cellIndex) => {
                  return (
                    <li
                      key={cellIndex}
                      className={`grid-small-cell ${
                        cell === null ? 'empty' : ''
                      }`}
                      onClick={() => {
                        if (
                          smallGridCells[smallGridIndex][cellIndex] !== null ||
                          bigGridCells[smallGridIndex] !== null ||
                          isGameOver
                        ) {
                          return;
                        }

                        const newCells = [...smallGridCells];

                        if (isCrossTurn) {
                          newCells[smallGridIndex][cellIndex] = 'x';
                        } else {
                          newCells[smallGridIndex][cellIndex] = 'o';
                        }

                        checkSmallGrid(newCells);
                        setSmallGridCells(newCells);
                        setIsCrossTurn(!isCrossTurn);
                      }}
                    >
                      {cell === 'x' && <ImCross className='cross-icon' />}
                      {cell === 'o' && <FaCircleDot className='circle-icon' />}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
