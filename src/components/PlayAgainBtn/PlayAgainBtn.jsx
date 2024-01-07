import './PlayAgainBtn.css';

const PlayAgainBtn = ({ onClick }) => {
  return (
    <div className='play-again-container'>
      <button className='play-again-btn' onClick={onClick}>
        Play Again
      </button>
    </div>
  );
};

export default PlayAgainBtn;
