import './Score.css';

import React from 'react';

const Score = ({ isCrossTurn, circleScore, crossScore, isGameOver }) => {
  return (
    <div
      className={`score ${isGameOver ? 'game-over' : 'active'} ${
        circleScore > crossScore ? 'circle-win' : ''
      } ${circleScore < crossScore ? 'cross-win' : ''}`}
    >
      <div className={`score-bar circle-bar ${isCrossTurn ? '' : 'active'}`}>
        <p>O: {circleScore}</p>
      </div>
      <div className={`score-bar cross-bar  ${isCrossTurn ? 'active' : ''}`}>
        X: {crossScore}
      </div>
    </div>
  );
};

export default Score;
