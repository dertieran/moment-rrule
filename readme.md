# Moment RRule [![Build Status](https://api.travis-ci.org/DerTieran/moment-rrule.svg?branch=master)](https://travis-ci.org/DerTieran/moment-rrule)

> A moment plugin to work with RFC 5545 recurrence rules

**Note:** This plugin is in development, if you want a more completed and tested package use [`rrule`](https://github.com/jakubroztocil/rrule) or [`moment-recur`](https://github.com/c-trimm/moment-recur).

```js
const moment = require('moment-rrule');

const start = moment('2018-01-01');
const rrule = start.rrule({ freq: 'monthly' });

const dates = rrule.between(start, moment('2018-12-01'));
// => [2018-01-01, 2018-02-01, ..., 2018-11-01, 2018-12-01]
```

_For more examples see the `test` folder_

## License

MIT © [Philipp Beck](https://github.com/DerTieran)
