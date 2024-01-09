import React from 'react';

const Score = ({ isCrossTurn, crossScore, circleScore, isGameOver }) => {
  return (
    <div className={`score ${isGameOver ? '' : 'score-active'}`}>
      <div
        className={`score-side cross-score-side ${isCrossTurn ? 'active-side' : ''}`}
      >
        X: {crossScore}
      </div>
      <div
        className={`score-side circle-score-side ${isCrossTurn ? '' : 'active-side'}`}
      >
        O: {circleScore}
      </div>
    </div>
  );
};

export default Score;
