const moment = require('moment');
const db = require("db");

exports.getAvailableSlots = async (req, res) => {
  let timeslots = [];
  const { hostUserId } = req.query;
  const events = await db.calendar.findEventsForUser(hostUserId);
  const todayDate = new Date().getDate();
  // Filter only events in next 7 days
  const nextSevenDaysEvents = events.filter(event => moment(event.start).date() > todayDate);

  for (let dateOffset = 1; dateOffset <= 7; dateOffset++) {
    const todayEvents = nextSevenDaysEvents.filter(event => moment(event.start).date() == todayDate + dateOffset);

    for (let hour = 9; hour <= 16; hour++) {
      const slot = moment(new Date()).date(todayDate + dateOffset).hour(hour).minute(0).second(0).millisecond(0).format('YYYY-MM-DDTHH:mm:ss.SSS');
      let flag = true;

      todayEvents.forEach(event => {
        const start = new Date(event.start).getTime();
        const end = new Date(event.end).getTime();
        const slotStart = new Date(slot).getTime();
        const slotEnd = new Date(moment(slot).add(1, "h")).getTime();

        if (start <= slotStart && slotStart < end || start < slotEnd && slotEnd <= end || start >= slotStart && slotEnd >= end) {
          flag = false;
        }
      });

      if (flag) timeslots.push(slot);
    }
  }

  res.json({
    name: hostUserId,
    timeslotLengthMin: 60,
    // This is mock data that you should remove and replace with `db.calendar.findEventsForUser`.
    // See the README for more details.
    timeslots: timeslots,
  });
}