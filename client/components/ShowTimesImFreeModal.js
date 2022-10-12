import React, { useState } from 'react';

export default function ShowTimesImFreeModal({ calendarName, onClose }) {
  const [guestUserId, setGuestUserId] = useState('guest user id 1');

  return (
    <div className='sc-bdVaJa ddveOZ'>
      <div className='sc-bwzfXH kReIHc snipcss-TDeQ3'>
        <div>
          <div className='flexbox  flexbox--column  1/1 text-center  alert--upgrade  flex-center  ui-face  mt++  mb+-'>
            <div className='flexbox flex-center  mb+'>
              <figure className='public-calendar__avatar  mr'>
                <img
                  alt='Mixmax'
                  src='https://cal.mixmax.com/img/badge_mixmax.png'
                />
              </figure>
            </div>
            <hgroup>
              <h1 className='text-medium  mb'>
                Are you free to meet with {calendarName}?
              </h1>
              <h4
                className='text-normal  mb  center-h  ph+++  milli'
                style={{ maxWidth: '700px' }}
              >
                {calendarName}'s calendar is powered by{' '}
                <a href='https://www.mixmax.com/'>Mixmax</a>
              </h4>
              <h4
                className='text-normal  mb+  center-h  text-mute  ph+++  milli'
                style={{ maxWidth: '700px' }}
              >
                Sign in to show scheduling conflicts and times you're free
              </h4>
            </hgroup>
            <div className='ph+'>
              <hr className='center-h  separator-horizontal' />
            </div>
            <input
              value={guestUserId}
              className='component-width-3x  center-h  p  mt+'
              style={{ border: '1px solid black' }}
              onChange={(e) => setGuestUserId(e.target.value)}
            />
            <button
              className='js-login  center-h  component-width-3x  pointer  mt  mb+'
              style={{
                fontSize: '22px',
                padding: '5px',
              }}
              onClick={() => onClose(guestUserId)}
            >
              Sign in
            </button>
            <div className='ph+'>
              <hr className='center-h  separator-horizontal  mb+' />
            </div>
            <small className='center-h  micro  ui-face  mt+- -mb+'>
              <a href='#' onClick={() => onClose()}>
                Skip this, I’ll pick a time that might conflict.
              </a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
