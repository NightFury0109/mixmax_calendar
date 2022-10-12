const moment = require('moment');
const random = require('random');
const seedrandom = require('seedrandom');

const START_WORKDAY = 9;
const END_WORKDAY = 17;

function dateStr(m) {
  return m.format('YYYY-MM-DDTHH:mm:ss.SSS');
}

const DB = {
  calendar: {
    /**
     * Returns all calendar events for the given user.
     */
    findEventsForUser: async (user) => {
      const { uniformInt } = random.clone(seedrandom(user));

      const today = moment().startOf('day');
      const n = uniformInt(5, 30)();

      const events = [];
      for (let i = 0; i < n; i++) {
        // Start date between yesterday and 7 days forward:
        const start = today.clone().add(uniformInt(-1, 7)(), 'days');

        // Start time in [START_WORKDAY, END_WORKDAY) hours:
        start.add(uniformInt(START_WORKDAY, END_WORKDAY - 1)(), 'hours');

        // Add between 0 and 50 minutes:
        start.add(uniformInt(0, 5)() * 10, 'minutes');

        // Add random duration between 30 and 120 minutes to get end time:
        const end = start.clone().add(uniformInt(3, 12)() * 10, 'minutes');

        if (end.hour() >= END_WORKDAY) {
          end.add(1, 'day').subtract(END_WORKDAY - START_WORKDAY, 'hours');
        }

        events[i] = {
          start: dateStr(start),
          end: dateStr(end),
        };
      }
      return events;
    },
  },
};

module.exports = DB;
