const moment = require('moment');
const db = require('./index');

describe('calendar.findEventsForUser', () => {
  it('returns between 5 and 30 events', async () => {
    const result = await db.calendar.findEventsForUser('foo');

    expect(result.length).toBeGreaterThanOrEqual(5);
    expect(result.length).toBeLessThanOrEqual(30);
  });
  it('returns dates between yesterday and 8 days into the future', async () => {
    const result = await db.calendar.findEventsForUser('bar');

    const today = moment().startOf('day');
    const in8days = today.clone().add(8, 'days').format('YYYY-MM-DD');
    const in9days = today.clone().add(9, 'days').format('YYYY-MM-DD');
    const yesterday = today.clone().add(-1, 'days').format('YYYY-MM-DD');
    result.forEach((event) => {
      expect(event.start).toMatch(/^\d\d\d\d-\d\d-\d\dT/);
      expect(event.start >= yesterday).toBe(true);
      expect(event.start < in8days).toBe(true);
      expect(event.end).toMatch(/^\d\d\d\d-\d\d-\d\dT/);
      expect(event.end >= yesterday).toBe(true);
      expect(event.end <= in9days).toBe(true);
    });
  });
  it('returns times between 9 (inclusive) and 5 (exclusive)', async () => {
    const result = await db.calendar.findEventsForUser('baz');

    result.forEach((event) => {
      expect(moment(event.start).hour()).toBeGreaterThanOrEqual(9);
      expect(moment(event.start).hour()).toBeLessThan(17);

      expect(moment(event.end).hour()).toBeGreaterThanOrEqual(9);
      expect(moment(event.end).hour()).toBeLessThan(17);
    });
  });
  it('returns events which end after starting', async () => {
    const result = await db.calendar.findEventsForUser('baz');

    result.forEach((event) => {
      expect(event.start < event.end).toBe(true);
    });
  });
});
