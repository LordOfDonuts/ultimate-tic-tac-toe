import './App.css';

import Score from './components/score/Score';
import Rules from './components/open-rules-button/Rules';

import { useState } from 'react';

import { ImCross } from 'react-icons/im';
import { FaCircleDot } from 'react-icons/fa6';
import ResetButton from './components/reset-button/ResetButton';

function App() {
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

  const checkSmallGrid = (smallGrids) => {
    for (let i = 0; i < 9; i++) {
      if (bigGridCells[i] !== null) continue;

      const currentGrid = smallGrids[i];

      // Check Rows
      for (let j = 0; j < 3; j++) {
        if (currentGrid[j * 3] === null) continue;
        if (
          currentGrid[j * 3] === currentGrid[j * 3 + 1] &&
          currentGrid[j * 3] === currentGrid[j * 3 + 2]
        ) {
          const newBigGrids = [...bigGridCells];

          if (currentGrid[j * 3] === 'x') {
            newBigGrids[i] = 'x';
            setCrossScore(crossScore + 1);
          } else {
            newBigGrids[i] = 'o';
            setCircleScore(circleScore + 1);
          }

          setBigGridCells(newBigGrids);
        }
      }

      // Check Columns
      for (let j = 0; j < 3; j++) {
        if (currentGrid[j] === null) continue;
        if (
          currentGrid[j] === currentGrid[j + 3] &&
          currentGrid[j] === currentGrid[j + 6]
        ) {
          const newBigGrids = [...bigGridCells];

          if (currentGrid[j] === 'x') {
            newBigGrids[i] = 'x';
            setCrossScore(crossScore + 1);
          } else {
            newBigGrids[i] = 'o';
            setCircleScore(circleScore + 1);
          }

          setBigGridCells(newBigGrids);
        }
      }

      // Check Oblique
      if (currentGrid[0] !== null) {
        if (
          currentGrid[0] === currentGrid[4] &&
          currentGrid[0] === currentGrid[8]
        ) {
          const newBigGrids = [...bigGridCells];

          if (currentGrid[0] === 'x') {
            newBigGrids[i] = 'x';
            setCrossScore(crossScore + 1);
          } else {
            newBigGrids[i] = 'o';
            setCircleScore(circleScore + 1);
          }

          setBigGridCells(newBigGrids);
        }
      }

      if (currentGrid[2] !== null) {
        if (
          currentGrid[2] === currentGrid[4] &&
          currentGrid[2] === currentGrid[6]
        ) {
          const newBigGrids = [...bigGridCells];

          if (currentGrid[2] === 'x') {
            newBigGrids[i] = 'x';
            setCrossScore(crossScore + 1);
          } else {
            newBigGrids[i] = 'o';
            setCircleScore(circleScore + 1);
          }

          setBigGridCells(newBigGrids);
        }
      }
    }
  };

  const resetGame = () => {
    setIsCrossTurn(false);
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
      />
      <ul className='grid-big'>
        {smallGridCells.map((smallGrid, smallGridIndex) => {
          return (
            <li
              key={smallGridIndex}
              className={`grid-small ${
                bigGridCells[smallGridIndex] === null ? 'free' : ''
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
                          bigGridCells[smallGridIndex] !== null
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
