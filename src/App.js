import './App.css';

import React, { useState } from 'react';

function App() {
  const [turns, setTurns] = useState([
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

  return (
    <>
      <h1>Ultimate Tic-Tac-Toe</h1>
      <div className='game-container'>
        <div>
          <div className='score'>
            <div className='score-side x-side'>X: {3}</div>
            <div className='score-side o-side'>O: {3}</div>
          </div>
          <div className='general-grid'>
            {turns.map((smallGrid, smallGridIndex) => {
              return (
                <div key={smallGridIndex} className='small-grid'>
                  {smallGrid.map((item, itemIndex) => {
                    return <div key={itemIndex} className='item'></div>;
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;