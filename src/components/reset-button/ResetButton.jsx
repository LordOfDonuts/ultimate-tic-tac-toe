import { GrPowerReset } from 'react-icons/gr';

const ResetButton = ({ onClick }) => {
  return (
    <div className='reset-button' onClick={onClick}>
      <GrPowerReset />
    </div>
  );
};

export default ResetButton;
