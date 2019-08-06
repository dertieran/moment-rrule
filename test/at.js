'use strict';

const test = require('ava');
const moment = require('..');

test('first', t => {
  const dtstart = moment();
  const rrule = dtstart.rrule({freq: 'weekly'});

  const first = rrule.at(0);
  t.true(first.isValid());
  t.is(first.toISOString(), dtstart.toISOString());
});

test('negative number', t => {
  const rrule = moment().rrule({freq: 'weekly'});
  const invalid = rrule.at(-5);
  t.false(invalid.isValid());
});

test('invalid number', t => {
  const rrule = moment().rrule({freq: 'weekly'});
  const invalid = rrule.at('invalid number');
  t.false(invalid.isValid());
});

test('overflow number', t => {
  const count = 2;
  const rrule = moment().rrule({freq: 'weekly', count});
  const invalid = rrule.at(count);
  t.false(invalid.isValid());
});

test('every other week', t => {
  const dtstart = moment();
  const rrule = dtstart.rrule({
    freq: 'weekly',
    interval: 2
  });

  const next = rrule.at(2);
  t.true(next.isValid());
  t.is(next.toISOString(), dtstart.clone().add(4, 'weeks').toISOString());
});
