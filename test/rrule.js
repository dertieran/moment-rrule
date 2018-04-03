'use strict';

const test = require('ava');
const moment = require('..');

test('dtstart', t => {
  const freq = 'weekly';
  t.throws(() => moment.invalid().rrule({freq}));
  t.throws(() => moment.rrule({dtstart: null, freq}));

  t.notThrows(() => moment().rrule({freq}));
  t.notThrows(() => moment.rrule({dtstart: moment().toISOString(), freq}));
});

test('frequencies', t => {
  const withFrequency = freq => () => moment.rrule({
    dtstart: moment(),
    freq
  });

  const invalid = [null, 'foo'];
  invalid.forEach(freq => {
    t.throws(withFrequency(freq));
  });

  const valid = ['daily', 'days', 'weekly', 'weeks', 'monthly', 'months', 'yearly', 'years'];
  valid.forEach(freq => {
    t.notThrows(withFrequency(freq));
    t.notThrows(withFrequency(freq.toUpperCase()));
  });
});

test('count', t => {
  const withCount = count => () => moment.rrule({
    dtstart: moment(),
    freq: 'weekly',
    count
  });

  t.throws(withCount(0));
  t.notThrows(withCount(2));
});

test('create rrule with until', t => {
  const dtstart = moment();
  const withUntil = until => () => dtstart.rrule({
    freq: 'weekly',
    until
  });

  t.throws(withUntil(moment.invalid()));
  t.throws(withUntil(dtstart.clone().subtract(1, 'week')));
  t.notThrows(withUntil(dtstart.clone().add(1, 'week')));
});
