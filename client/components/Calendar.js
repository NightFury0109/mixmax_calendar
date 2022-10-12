import React from 'react';
import Day from './Day';

export default function Calendar({ timeslots, timeslotLengthMin }) {
  // Convert to Date objects and group by the calendar date
  const timeslotsByDays = timeslots.reduce(
    (timeslotsByDays, timeslotString) => {
      const timeslot = new Date(timeslotString);
      const lastDay = timeslotsByDays[timeslotsByDays.length - 1];
      if (lastDay) {
        const lastDayDate = new Date(lastDay[0]).setHours(0, 0, 0, 0);
        const timeslotDate = new Date(timeslot).setHours(0, 0, 0, 0);
        if (lastDayDate === timeslotDate) {
          lastDay.push(timeslot);
          return timeslotsByDays;
        }
      }

      timeslotsByDays.push([timeslot]);
      return timeslotsByDays;
    },
    []
  );

  return (
    <div className='pl++  pr appointmentslots__calendar flexbox  flexbox--column--palm'>
      {timeslotsByDays.map((timeslots, index) => {
        return (
          <Day
            key={index}
            timeslots={timeslots}
            timeslotLengthMin={timeslotLengthMin}
          />
        );
      })}
    </div>
  );
}
