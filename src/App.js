import './App.css';

import React, { useState } from 'react';

import SmallGridItems from './components/SmallGridItems';

import XGrid from './components/XGrid';
import CircleGrid from './components/CircleGrid';

function App() {
  const startTurnsArray = [
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

  const [turns, setTurns] = useState(startTurnsArray);
  const [bigItems, setBigItems] = useState([
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

  const [isXTurn, setIsXTurn] = useState(true);
  const [xScore, setXScore] = useState(0);
  const [circleScore, setCircleScore] = useState(0);

  const winSmallGrid = (gridIndex, sign) => {
    const newBigItems = bigItems;
    newBigItems[gridIndex] = sign;

    if (sign === 'x') setXScore(xScore + 1);
    if (sign === 'o') setCircleScore(circleScore + 1);

    setBigItems(newBigItems);
  };

  const checkSmallGrid = (gridIndex) => {
    if (
      turns[gridIndex][0] !== null &&
      turns[gridIndex][0] === turns[gridIndex][1] &&
      turns[gridIndex][1] === turns[gridIndex][2]
    ) {
      winSmallGrid(gridIndex, turns[gridIndex][0]);
    } else if (
      turns[gridIndex][0] != null &&
      turns[gridIndex][0] === turns[gridIndex][3] &&
      turns[gridIndex][3] === turns[gridIndex][6]
    ) {
      winSmallGrid(gridIndex, turns[gridIndex][0]);
    } else if (
      turns[gridIndex][1] !== null &&
      turns[gridIndex][1] === turns[gridIndex][4] &&
      turns[gridIndex][4] === turns[gridIndex][7]
    ) {
      winSmallGrid(gridIndex, turns[gridIndex][1]);
    } else if (
      turns[gridIndex][2] !== null &&
      turns[gridIndex][2] === turns[gridIndex][5] &&
      turns[gridIndex][5] === turns[gridIndex][8]
    ) {
      winSmallGrid(gridIndex, turns[gridIndex][2]);
    } else if (
      turns[gridIndex][3] !== null &&
      turns[gridIndex][3] === turns[gridIndex][4] &&
      turns[gridIndex][4] === turns[gridIndex][5]
    ) {
      winSmallGrid(gridIndex, turns[gridIndex][3]);
    } else if (
      turns[gridIndex][6] !== null &&
      turns[gridIndex][6] === turns[gridIndex][7] &&
      turns[gridIndex][7] === turns[gridIndex][8]
    ) {
      winSmallGrid(gridIndex, turns[gridIndex][6]);
    } else if (
      turns[gridIndex][0] !== null &&
      turns[gridIndex][0] === turns[gridIndex][4] &&
      turns[gridIndex][4] === turns[gridIndex][8]
    ) {
      winSmallGrid(gridIndex, turns[gridIndex][0]);
    } else if (
      turns[gridIndex][2] !== null &&
      turns[gridIndex][2] === turns[gridIndex][4] &&
      turns[gridIndex][4] === turns[gridIndex][6]
    ) {
      winSmallGrid(gridIndex, turns[gridIndex][2]);
    }
  };

  const setTurn = (gridIndex, itemIndex) => {
    if (turns[gridIndex][itemIndex] != null) return;

    const newTurns = turns;

    if (isXTurn) {
      newTurns[gridIndex][itemIndex] = 'x';
      setIsXTurn(false);
    } else {
      newTurns[gridIndex][itemIndex] = 'o';
    }

    checkSmallGrid(gridIndex);
    setIsXTurn(!isXTurn);
    setTurns(newTurns);
  };

  const resetTurns = () => {
    setTurns(startTurnsArray);
    setBigItems([null, null, null, null, null, null, null, null, null]);
    setIsXTurn(true);
    setCircleScore(0);
    setXScore(0);
  };

  return (
    <>
      <h1>Ultimate Tic-Tac-Toe</h1>
      <div className='game-container'>
        <div>
          <div className='score'>
            <div
              className={`score-side x-side ${isXTurn ? 'active-side' : ''}`}
            >
              X: {xScore}
            </div>
            <div
              className={`score-side o-side ${isXTurn ? '' : 'active-side'}`}
            >
              O: {circleScore}
            </div>
          </div>
          <div className='general-grid'>
            {turns.map((grid, gridIndex) => {
              return (
                <div
                  key={gridIndex}
                  className={bigItems[gridIndex] === null ? 'small-grid' : ''}
                >
                  {bigItems[gridIndex] === null && (
                    <SmallGridItems
                      grid={grid}
                      gridIndex={gridIndex}
                      setTurn={setTurn}
                    />
                  )}
                  {bigItems[gridIndex] === 'x' && <XGrid />}
                  {bigItems[gridIndex] === 'o' && <CircleGrid />}
                </div>
              );
            })}
          </div>
          <div className='play-again-container'>
            <button className='play-again-btn' onClick={resetTurns}>
              Play Again
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;