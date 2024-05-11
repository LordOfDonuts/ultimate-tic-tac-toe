import './Rules.css';

import { useState } from 'react';

import { FaQuestion, FaArrowRight } from 'react-icons/fa';

const Rules = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className='open-rules-btn' onClick={() => setIsOpen(true)}>
        <FaQuestion />
      </div>
      <div className={`rules ${isOpen ? 'open' : ''}`}>
        <h2>Rules</h2>
        <p>
          This is a game like Tic Tac Toe but there are nine grids instead of
          just one. Winning a grid earns a point and transforms the entire grid
          into a big sign representing the winning player. The objective is to
          accumulate the most points or achieve three big signs in a row to win
          the game.
        </p>
        <div className='close-rules-btn' onClick={() => setIsOpen(false)}>
          <FaArrowRight />
        </div>
      </div>
    </>
  );
};

export default Rules;
