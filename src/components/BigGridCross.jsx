import { ImCross } from 'react-icons/im';

const BigGridCross = ({ isWinCombination = true }) => {
  return (
    <div className='big-grid-cross'>
      <ImCross />
    </div>
  );
};

export default BigGridCross;
