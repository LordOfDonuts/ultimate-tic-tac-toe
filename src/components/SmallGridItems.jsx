import React from 'react';

import XCell from './XCell';
import CircleCell from './CircleCell';

const SmallGridItems = ({grid, gridIndex, setTurn}) => {
  return (
    <>
      {grid.map((gridItem, gridItemIndex) => {
        return (
          <div
            key={gridItemIndex}
            className='item'
            onClick={() => setTurn(gridIndex, gridItemIndex)}
          >
            {gridItem === 'x' ? <XCell /> : ''}
            {gridItem === 'o' ? <CircleCell /> : ''}
          </div>
        );
      })}
    </>
  );
};

export default SmallGridItems;
