'use strict';

const test = require('ava');
const moment = require('..');

test('invalid last when no end', t => {
  const rrule = moment.rrule({
    dtstart: moment(),
    freq: 'weekly'
  });

  const last = rrule.last();
  t.false(last.isValid());
});

test('last from count', t => {
  const dtstart = moment();
  const next = dtstart.clone().add(1, 'week');
  const rrule = dtstart.rrule({
    freq: 'weekly',
    count: 2
  });

  const last = rrule.last();
  t.true(last.isValid());
  t.is(next.toISOString(), last.toISOString());
});

test('last from until', t => {
  const dtstart = moment();
  const until = dtstart.clone().add(1, 'week');
  const rrule = dtstart.rrule({
    freq: 'weekly',
    until
  });

  const last = rrule.last();
  t.true(last.isValid());
  t.is(until.toISOString(), last.toISOString());
});

test('last from not matching until', t => {
  const dtstart = moment();
  const next = dtstart.clone().add(1, 'week');
  const rrule = dtstart.rrule({
    freq: 'weekly',
    until: next.clone().add(1, 'day')
  });

  const last = rrule.last();
  t.true(last.isValid());
  t.is(next.toISOString(), last.toISOString());
});

test('every other week', t => {
  const dtstart = moment();
  const rrule = dtstart.rrule({
    freq: 'weekly',
    interval: 2,
    until: dtstart.clone().add(5, 'weeks')
  });

  const next = rrule.last();
  t.true(next.isValid());
  t.is(next.toISOString(), dtstart.clone().add(4, 'weeks').toISOString());
});
