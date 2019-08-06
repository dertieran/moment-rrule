'use strict';

const test = require('ava');
const moment = require('..');

test('dtstart', t => {
  const dtstart = moment();
  const rrule = dtstart.rrule({
    freq: 'weekly'
  });

  const date = rrule.before(dtstart.clone().add(1, 'minute'));
  t.true(date.isValid());
  t.is(date.toISOString(), dtstart.toISOString());
});

test('until', t => {
  const dtstart = moment();
  const until = dtstart.clone().add(1, 'week');
  const rrule = dtstart.rrule({
    freq: 'weekly',
    until
  });

  const date = rrule.before(until.clone().add(1, 'minute'));
  t.true(date.isValid());
  t.is(date.toISOString(), until.toISOString());
});

test('every other week', t => {
  const dtstart = moment();
  const rrule = dtstart.rrule({
    freq: 'weekly',
    interval: 2
  });

  const next = rrule.before(dtstart.clone().add(3, 'weeks'));
  t.true(next.isValid());
  t.is(next.toISOString(), dtstart.clone().add(2, 'weeks').toISOString());
});
