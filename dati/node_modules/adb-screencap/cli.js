#!/usr/bin/env node
var screencap = require('./dist/index.js').default;
var semafor = require('semafor');
var logger = semafor();
var argv = require('minimist')(process.argv.slice(2));
if(argv["h"] || argv["help"]) {
  console.log("Usage\n adb-screencap [-d device_id]");
  return;
}
console.log(argv);
screencap(function(err, path) {
    if(err) logger.fail(err);
    else logger.ok(path);
}, argv["d"]);