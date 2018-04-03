'use strict';

const moment = require('moment');
const RRule = require('./rrule');

moment.rrule = opt => new RRule(opt);

moment.fn.rrule = function (opt) {
  const dtstart = this;
  return new RRule(Object.assign({dtstart}, opt));
};

module.exports = moment;
