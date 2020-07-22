import moment from 'moment';
import {
  getSprintEndDate,
  getEvents,
  getSprintBeginDate,
} from './SprintCalculator';

describe('sprint calculator', () => {
  test('starting at wednesday', () => {
    const start = moment('2020-01-01 12:34').toDate();
    const startTime = moment('2020-01-01 09:00').toDate();
    const now = moment('2020-01-14 22:33').toDate();
    const end = moment('2020-01-01 18:00').toDate();
    expect(getSprintEndDate(start, 1, now, startTime, end).getTime()).toBe(
      moment('2020-01-21 18:00')
        .toDate()
        .getTime(),
    );
    expect(getSprintEndDate(start, 2, now, startTime, end).getTime()).toBe(
      moment('2020-01-28 18:00')
        .toDate()
        .getTime(),
    );
    expect(getSprintEndDate(start, 3, now, startTime, end).getTime()).toBe(
      moment('2020-01-21 18:00')
        .toDate()
        .getTime(),
    );
    expect(getSprintEndDate(start, 4, now, startTime, end).getTime()).toBe(
      moment('2020-01-28 18:00')
        .toDate()
        .getTime(),
    );
  });
  test('starting at today', () => {
    const start = moment('2020-04-03 16:06').toDate();
    const startTime = moment('2020-04-03 09:00').toDate();
    const now = moment('2020-04-03 16:06').toDate();
    const end = moment('2020-04-03 18:00').toDate();
    expect(getSprintEndDate(start, 1, now, startTime, end).getTime()).toBe(
      moment('2020-04-09 18:00')
        .toDate()
        .getTime(),
    );
  });
  test('today is sprint end day', () => {
    const start = moment('2020-01-08 09:00').toDate();
    const startTime = moment('2020-01-08 09:00').toDate();
    const now = moment('2020-04-07 11:34').toDate();
    const end = moment('2020-04-07 17:00').toDate();
    expect(getSprintEndDate(start, 1, now, startTime, end).getTime()).toBe(
      moment('2020-04-07 17:00')
        .toDate()
        .getTime(),
    );
  });
  test('starting at monday', () => {
    const start = moment('2020-04-06 09:00').toDate();
    const startTime = moment('2020-04-06 09:00').toDate();
    const now = moment('2020-04-08 11:22').toDate();
    const end = moment('2020-04-06 17:00').toDate();
    expect(getSprintEndDate(start, 1, now, startTime, end).getTime()).toBe(
      moment('2020-04-10 17:00')
        .toDate()
        .getTime(),
    );
  });
});

describe('get sprint begin date', () => {
  test('week day sprint 1', () => {
    const start = moment('2020-04-06 09:00').toDate();
    const startTime = moment('2020-04-06 09:00').toDate();
    const now = moment('2020-04-08 11:22').toDate();
    const end = moment('2020-04-06 17:00').toDate();
    expect(getSprintBeginDate(start, 1, now, startTime, end).getTime()).toBe(
      moment('2020-04-06 09:00')
        .toDate()
        .getTime(),
    );
    expect(getSprintBeginDate(start, 2, now, startTime, end).getTime()).toBe(
      moment('2020-04-06 09:00')
        .toDate()
        .getTime(),
    );
  });
  test('week day sprint 2', () => {
    const start = moment('2020-04-06 09:00').toDate();
    const startTime = moment('2020-04-06 09:00').toDate();
    const now = moment('2020-04-16 11:22').toDate();
    const end = moment('2020-04-06 17:00').toDate();
    expect(getSprintBeginDate(start, 1, now, startTime, end).getTime()).toBe(
      moment('2020-04-13 09:00')
        .toDate()
        .getTime(),
    );
    expect(getSprintBeginDate(start, 2, now, startTime, end).getTime()).toBe(
      moment('2020-04-06 09:00')
        .toDate()
        .getTime(),
    );
  });
  test('sprint start day', () => {
    const start = moment('2020-04-06 09:00').toDate();
    const startTime = moment('2020-04-06 09:00').toDate();
    const now = moment('2020-04-20 07:12').toDate();
    const end = moment('2020-04-06 17:00').toDate();
    expect(getSprintBeginDate(start, 1, now, startTime, end).getTime()).toBe(
      moment('2020-04-20 09:00')
        .toDate()
        .getTime(),
    );
    expect(getSprintBeginDate(start, 2, now, startTime, end).getTime()).toBe(
      moment('2020-04-20 09:00')
        .toDate()
        .getTime(),
    );
  });
});

describe('get events', () => {
  test('holiday', () => {
    const begin = moment('2020-04-06 09:00');
    const end = moment('2020-04-06 18:00');
    const daily = moment('2020-04-06 09:30');
    const now = moment('2020-04-12 09:30');
    expect(getEvents(begin, end, daily, now)[0].content).toEqual(
      'today is holiday',
    );
  });
});
