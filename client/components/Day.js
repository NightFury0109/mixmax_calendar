import React from 'react';

function formatTime(date) {
  const formattedTime = Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
  return formattedTime.toLowerCase().replace(' ', '');
}

export default function Day({ timeslots, timeslotLengthMin }) {
  const dayOfWeek = timeslots[0].toLocaleDateString(navigator.language, {
    weekday: 'short',
  });
  const monthDay = timeslots[0].toLocaleDateString(navigator.language, {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className='public-calendar__day  flexbox  flex-fill--lap-and-up  flexbox--column--lap-and-up  mt+  mr+-'>
      <div className='public-calendar__date flexbox  flex-align-end  mb+-'>
        <div className='text-black text-medium mr zeta'>{dayOfWeek}</div>
        <div className='text-grey zeta'>{monthDay}</div>
      </div>
      <div className='flexbox  flex-fill  flexbox--column  appointmentslots__day-column  public-calendar__day'>
        {timeslots.map((timeslot) => {
          const startTimeString = formatTime(timeslot);
          const endTime = new Date(
            timeslot.valueOf() + timeslotLengthMin * 60 * 1000
          );
          const endTimeString = formatTime(endTime);
          return (
            <div
              className='sc-jzJRlG ilzEXd mb public-calendar__time-slot  text-center  milli  text-reverse'
              role='button'
              key={startTimeString}
            >
              {startTimeString} – {endTimeString}
            </div>
          );
        })}
      </div>
    </div>
  );
}
