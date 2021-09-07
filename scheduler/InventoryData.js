"use strict";

var schedule = require('node-schedule');

schedule.scheduleJob('42 * * * *', function () {
  console.log('The answer to life, the universe, and everything!');
});

exports.InventoryData = function () {};