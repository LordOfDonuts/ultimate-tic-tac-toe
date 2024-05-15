import './Rules.css';

import { useState } from 'react';
import ExamplePicture from '../../ExampleForRules.jpg';

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
          just one. Winning a small grid earns a point and transforms the small
          grid into a big sign representing the winning player. If you win the
          big grid you earn three points and game finishes. The objective is to
          get the most points.
        </p>
        <img src={ExamplePicture} alt='' />
        <div className='close-rules-btn' onClick={() => setIsOpen(false)}>
          <FaArrowRight />
        </div>
      </div>
    </>
  );
};

export default Rules;
