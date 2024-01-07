import React from 'react';

const Score = ({ isCrossTurn, crossScore, circleScore }) => {
  return (
    <div className='score'>
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
