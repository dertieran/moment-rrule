'use strict';

const test = require('ava');
const moment = require('..');

test('between first and last', t => {
  const dtstart = moment();
  const until = dtstart.clone().add(1, 'week');
  const rrule = dtstart.rrule({
    freq: 'weekly',
    until
  });

  const dates = rrule.between(dtstart.clone().subtract(1, 'minute'), until.clone().add(1, 'minute'));
  t.is(dates.length, 2);
  t.is(dates[0].toISOString(), dtstart.toISOString());
  t.is(dates[1].toISOString(), until.toISOString());
});

test('empty when before', t => {
  const dtstart = moment();
  const rrule = dtstart.rrule({
    freq: 'weekly'
  });

  const dates = rrule.between(dtstart.clone().subtract(1, 'week'), dtstart.clone().subtract(1, 'minute'));
  t.is(dates.length, 0);
});

test('empty when after', t => {
  const dtstart = moment();
  const until = dtstart.clone().add(1, 'week');
  const rrule = dtstart.rrule({
    freq: 'weekly',
    until
  });

  const dates = rrule.between(until.clone().add(1, 'minute'), until.clone().add(1, 'week'));
  t.is(dates.length, 0);
});
