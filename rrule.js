'use strict';

const moment = require('moment');

// NOTE: These are basically lodash methods, maybe import them at some point.
const isNil = v => v === undefined || v === null;
const times = (n, fn) => new Array(n).fill().map((_, i) => fn(i));

const freqToUnit = frequency => {
  if (typeof frequency !== 'string') {
    return;
  }

  const freq = frequency.trim().toLowerCase();
  if (freq === 'daily') {
    return 'day';
  }

  const unit = freq.replace(/(ly)?$/, '');
  return moment.normalizeUnits(unit);
};

const defaults = {
  dtstart: null,
  freq: null,
  interval: 1,
  count: null,
  until: null
};

class RRule {
  constructor(options) {
    const opt = Object.assign({}, defaults, options);

    this.dtstart = opt.dtstart ? moment(opt.dtstart) : moment.invalid();
    if (this.dtstart.isValid() === false) {
      throw new Error('Invalid dtstart', options.dtstart);
    }

    this.unit = freqToUnit(opt.freq);
    if (!this.unit) {
      throw new Error(`Invalid frequency, ${options.freq}`);
    }

    this.interval = Number.parseInt(opt.interval, 10) || 1;
    if (!this.interval || this.interval < 1) {
      throw new Error(`Invalid interval, ${options.interval} must be greater or equal 1`);
    }

    if (isNil(opt.count) === false) {
      this.count = Number.parseInt(opt.count, 10);
      if (!this.count || this.count < 1) {
        throw new Error(`Invalid count, ${options.count} must be greater 0`);
      }
    } else if (isNil(opt.until) === false) {
      this.until = moment(opt.until);
      if (this.until.isValid() === false) {
        throw new Error(`Invalid until, ${options.until} must be a valid date`);
      }
      if (this.until.isBefore(this.dtstart)) {
        throw new Error(`Invalid until, ${options.until} must be after dtstart`);
      }
    }
  }

  last() {
    if (this.count) {
      return this.dtstart.clone().add(this.count - 1, this.unit);
    }

    if (this.until) {
      const diff = this.until.diff(this.dtstart, this.unit);
      if (diff < 0) {
        return moment.invalid();
      }

      return this.dtstart.clone().add(diff, this.unit);
    }

    return moment.invalid();
  }

  at(num) {
    const index = Number.parseInt(num, 10);
    if (Number.isNaN(index) || index < 0) {
      return moment.invalid();
    }

    const last = this.last();
    const date = this.dtstart.clone().add(index, this.unit);
    if (date.isAfter(last)) {
      return moment.invalid();
    }
    return date;
  }

  after(date) {
    const m = moment(date);
    const diff = Math.ceil(m.diff(this.dtstart, this.unit, true));
    if (diff < 1) {
      return this.dtstart.clone();
    }

    const last = this.last();
    const after = this.dtstart.clone().add(diff, this.unit);
    if (after.isAfter(last)) {
      return moment.invalid();
    }

    return after;
  }

  before(date) {
    const m = moment(date);
    const diff = Math.floor(m.diff(this.dtstart, this.unit, true));
    if (diff < 0) {
      return moment.invalid();
    }

    const last = this.last();
    const before = this.dtstart.clone().add(diff, this.unit);
    if (before.isAfter(last)) {
      return last;
    }

    return before;
  }

  between(after, before) {
    const from = this.after(after);
    if (from.isValid() === false) {
      return [];
    }

    const to = this.before(before);
    if (to.isValid() === false) {
      return [];
    }

    const diff = to.diff(from, this.unit);
    if (diff < 0) {
      return [];
    }

    return times(diff + 1, i => from.clone().add(i, this.unit));
  }
}

module.exports = RRule;
