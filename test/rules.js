'use strict';

// NOTE: These are all recurrence rules examples from
// https://tools.ietf.org/html/rfc5545#section-3.8.5.3

const test = require('ava');
const moment = require('..');

test('Daily for 10 occurrences', t => {
  const rrule = moment.rrule({
    dtstart: moment('19970902T090000'),
    freq: 'daily',
    count: 10
  });

  t.is(rrule.at(0).format('YYYY-MM-DD'), '1997-09-02');
  t.is(rrule.last().format('YYYY-MM-DD'), '1997-09-11');
});

test('Daily until December 24, 1997', t => {
  const rrule = moment.rrule({
    dtstart: moment('19970902T090000'),
    freq: 'daily',
    until: moment('19971224T000000Z')
  });

  t.is(rrule.at(0).format('YYYY-MM-DD'), '1997-09-02');
  t.is(rrule.last().format('YYYY-MM-DD'), '1997-12-23');
});

test('Every other day - forever', t => {
  const rrule = moment.rrule({
    dtstart: moment('19970902T090000'),
    freq: 'daily',
    interval: 2
  });

  t.is(rrule.at(0).format('YYYY-MM-DD'), '1997-09-02');
  t.is(rrule.at(14).format('YYYY-MM-DD'), '1997-09-30');
});

test('Every 10 days, 5 occurrences', t => {
  const rrule = moment.rrule({
    dtstart: moment('19970902T090000'),
    freq: 'daily',
    interval: 10,
    count: 5
  });

  t.is(rrule.at(0).format('YYYY-MM-DD'), '1997-09-02');
  t.is(rrule.last().format('YYYY-MM-DD'), '1997-10-12');
});

test('Weekly for 10 occurrences', t => {
  const rrule = moment.rrule({
    dtstart: moment('19970902T090000'),
    freq: 'weekly',
    count: 10
  });

  t.is(rrule.at(0).format('YYYY-MM-DD'), '1997-09-02');
  t.is(rrule.last().format('YYYY-MM-DD'), '1997-11-04');
});

test('Weekly until December 24, 1997', t => {
  const rrule = moment.rrule({
    dtstart: moment('19970902T090000'),
    freq: 'weekly',
    until: moment('19971224T000000Z')
  });

  t.is(rrule.at(0).format('YYYY-MM-DD'), '1997-09-02');
  t.is(rrule.last().format('YYYY-MM-DD'), '1997-12-23');
});

test('Every other week - forever', t => {
  const rrule = moment.rrule({
    dtstart: moment('19970902T090000'),
    freq: 'weekly',
    interval: 2
  });

  t.is(rrule.at(0).format('YYYY-MM-DD'), '1997-09-02');
  t.is(rrule.at(3).format('YYYY-MM-DD'), '1997-10-14');
  t.is(rrule.at(11).format('YYYY-MM-DD'), '1998-02-03');
});

test('Every 3 hours from 9:00 AM to 5:00 PM on a specific day', t => {
  const rrule = moment.rrule({
    dtstart: moment('19970902T090000'),
    freq: 'hourly',
    interval: 3,
    until: moment('19970902T170000')
  });

  t.is(rrule.at(0).format('YYYY-MM-DD HH:mm'), '1997-09-02 09:00');
  t.is(rrule.at(1).format('YYYY-MM-DD HH:mm'), '1997-09-02 12:00');
  t.is(rrule.last().format('YYYY-MM-DD HH:mm'), '1997-09-02 15:00');
});

test('Every 15 minutes for 6 occurrences', t => {
  const rrule = moment.rrule({
    dtstart: moment('19970902T090000'),
    freq: 'minutely',
    interval: 15,
    count: 6
  });

  t.is(rrule.at(0).format('YYYY-MM-DD HH:mm'), '1997-09-02 09:00');
  t.is(rrule.at(2).format('YYYY-MM-DD HH:mm'), '1997-09-02 09:30');
  t.is(rrule.last().format('YYYY-MM-DD HH:mm'), '1997-09-02 10:15');
});

test('Every hour and a half for 4 occurrences', t => {
  const rrule = moment.rrule({
    dtstart: moment('19970902T090000'),
    freq: 'minutely',
    interval: 90,
    count: 4
  });

  t.is(rrule.at(0).format('YYYY-MM-DD HH:mm'), '1997-09-02 09:00');
  t.is(rrule.at(2).format('YYYY-MM-DD HH:mm'), '1997-09-02 12:00');
  t.is(rrule.last().format('YYYY-MM-DD HH:mm'), '1997-09-02 13:30');
});
