import { useState } from 'react';

import './Rules.css';
import RulesExampleImage from '../../images/example-rules.png';

import { FaArrowLeft } from 'react-icons/fa';
import { MdOutlineQuestionMark } from 'react-icons/md';

const Rules = () => {
  const [isOpened, setIsOpened] = useState(false);

  const changeIsOpened = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className='rules-container'>
      <div className='rules-open rules-btn' onClick={changeIsOpened}>
        <MdOutlineQuestionMark />
      </div>
      <div className={`rules-description ${isOpened ? 'active' : ''}`}>
        <h2 className='rules-title'>Ultimate Tic-Tac-Toe Rules</h2>
        <div className='rules-image-container'>
          <img src={RulesExampleImage} alt='' className='rules-image' />
        </div>
        <ul className='rules-list'>
          <li>
            There are nine small fields and one large field. To place your
            symbol on the larger field, you must win a small field.
          </li>
          <li>Each win on a small field earns you +1 point.</li>
          <li>Winning on the large field grants you +3 points.</li>
          <li>The game concludes when a player wins a large field or there are no fields left.</li>
        </ul>
        <div className='rules-close rules-btn' onClick={changeIsOpened}>
          <FaArrowLeft />
        </div>
      </div>
    </div>
  );
};

export default Rules;
