import React from 'react';

export default function ShowTimesImFreeToggle({ isToggleOn, onToggle }) {
  return (
    <div className='sc-chPdSV jTiyvr pl++'>
      <div className='flexbox  flexbox--align-items-center  text-medium'>
        <div
          className='toggle  sc-kgoBCf hOyhab'
          title='Show times I’m free'
          onClick={onToggle}
        >
          <input type='checkbox' checked={isToggleOn} onChange={() => {}} />
          <div className='switch'></div>
        </div>
        <div className='p  mr++-  milli'>Show times I’m free</div>
      </div>
    </div>
  );
}
