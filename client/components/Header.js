import React from 'react';

export default function Header({ calendarName }) {
  return (
    <div className='sc-kGXeez lmkYuI'>
      <h3 className='text-medium'>Schedule a meeting with {calendarName}</h3>
      <span className='milli  text-mute'>Please pick a time slot below.</span>
    </div>
  );
}
