import React from 'react';

import SmallGridCross from './SmallGridCross';
import SmallGridCircle from './SmallGridCircle';

const SmallGridItems = ({ grid, gridIndex, setTurn }) => {
  return (
    <>
      {grid.map((gridItem, gridItemIndex) => {
        return (
          <div
            key={gridItemIndex}
            className='item'
            onClick={() => setTurn(gridIndex, gridItemIndex)}
          >
            {gridItem === 'cross' ? <SmallGridCross /> : ''}
            {gridItem === 'circle' ? <SmallGridCircle /> : ''}
          </div>
        );
      })}
    </>
  );
};

export default SmallGridItems;
