import './App.css';

import React, { useState } from 'react';

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

  const [smallGridValues, setSmallGridValues] = useState(startSmallGridValues);
  const [bigGridValues, setBigGridValues] = useState([
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

  const [isCrossTurn, setIsCrossTurn] = useState(true);
  const [crossScore, setCrossScore] = useState(0);
  const [circleScore, setCircleScore] = useState(0);

  const winSmallGrid = (gridIndex, sign) => {
    const newBigItems = bigGridValues;
    newBigItems[gridIndex] = sign;

    if (sign === 'x') setCrossScore(crossScore + 1);
    if (sign === 'o') setCircleScore(circleScore + 1);

    setBigGridValues(newBigItems);
  };

  const checkSmallGrid = (gridIndex) => {
    if (
      smallGridValues[gridIndex][0] !== null &&
      smallGridValues[gridIndex][0] === smallGridValues[gridIndex][1] &&
      smallGridValues[gridIndex][1] === smallGridValues[gridIndex][2]
    ) {
      winSmallGrid(gridIndex, smallGridValues[gridIndex][0]);
    } else if (
      smallGridValues[gridIndex][0] != null &&
      smallGridValues[gridIndex][0] === smallGridValues[gridIndex][3] &&
      smallGridValues[gridIndex][3] === smallGridValues[gridIndex][6]
    ) {
      winSmallGrid(gridIndex, smallGridValues[gridIndex][0]);
    } else if (
      smallGridValues[gridIndex][1] !== null &&
      smallGridValues[gridIndex][1] === smallGridValues[gridIndex][4] &&
      smallGridValues[gridIndex][4] === smallGridValues[gridIndex][7]
    ) {
      winSmallGrid(gridIndex, smallGridValues[gridIndex][1]);
    } else if (
      smallGridValues[gridIndex][2] !== null &&
      smallGridValues[gridIndex][2] === smallGridValues[gridIndex][5] &&
      smallGridValues[gridIndex][5] === smallGridValues[gridIndex][8]
    ) {
      winSmallGrid(gridIndex, smallGridValues[gridIndex][2]);
    } else if (
      smallGridValues[gridIndex][3] !== null &&
      smallGridValues[gridIndex][3] === smallGridValues[gridIndex][4] &&
      smallGridValues[gridIndex][4] === smallGridValues[gridIndex][5]
    ) {
      winSmallGrid(gridIndex, smallGridValues[gridIndex][3]);
    } else if (
      smallGridValues[gridIndex][6] !== null &&
      smallGridValues[gridIndex][6] === smallGridValues[gridIndex][7] &&
      smallGridValues[gridIndex][7] === smallGridValues[gridIndex][8]
    ) {
      winSmallGrid(gridIndex, smallGridValues[gridIndex][6]);
    } else if (
      smallGridValues[gridIndex][0] !== null &&
      smallGridValues[gridIndex][0] === smallGridValues[gridIndex][4] &&
      smallGridValues[gridIndex][4] === smallGridValues[gridIndex][8]
    ) {
      winSmallGrid(gridIndex, smallGridValues[gridIndex][0]);
    } else if (
      smallGridValues[gridIndex][2] !== null &&
      smallGridValues[gridIndex][2] === smallGridValues[gridIndex][4] &&
      smallGridValues[gridIndex][4] === smallGridValues[gridIndex][6]
    ) {
      winSmallGrid(gridIndex, smallGridValues[gridIndex][2]);
    }
  };

  const setTurn = (gridIndex, itemIndex) => {
    if (smallGridValues[gridIndex][itemIndex] != null) return;

    const newTurns = smallGridValues;

    if (isCrossTurn) {
      newTurns[gridIndex][itemIndex] = 'cross';
      setIsCrossTurn(false);
    } else {
      newTurns[gridIndex][itemIndex] = 'circle';
    }

    checkSmallGrid(gridIndex);
    setIsCrossTurn(!isCrossTurn);
    setSmallGridValues(newTurns);
  };

  const restartGame = () => {
    setSmallGridValues(startSmallGridValues);
    setBigGridValues([null, null, null, null, null, null, null, null, null]);
    setIsCrossTurn(true);
    setCircleScore(0);
    setCrossScore(0);
  };

  return (
    <>
      <h1 className='game-title'>Ultimate Tic-Tac-Toe</h1>
      <div className='game-container'>
        <div>
          <Score
            isCrossTurn={isCrossTurn}
            crossScore={crossScore}
            circleScore={circleScore}
          />
          <div className='big-grid'>
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
                      setTurn={setTurn}
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