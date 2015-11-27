'use strict';

var assert = require('assert');
var webdriverio = require('webdriverio');
var webdrivercss = require('webdrivercss');

var config = require('../tests.config.json');

// Variable to keep already processed tests.
// This is needed because the resource is maintained between
// single tests, thus it contains old failures that we want to
// avoid asserting again.
var processed = [];
var assertScreenshots = function (err, res) {
  // Variable to keep the new tests yet to be asserted.
  // This is needed because we first need to mark all new tests
  // as already processed, and then do the assertions.
  // As soon as one assertion fail, the loop is broken and the
  // remaining tests would not be marked as processed without
  // this.
  var testsToAssert = [];

  assert.ifError(err);

  Object.keys(res).forEach(function (key) {
    res[key].forEach(function (test) {
      if (processed.indexOf(test.baselinePath) == -1) {
        processed.push(test.baselinePath);
        testsToAssert.push(test);
      }
    });
  });

  testsToAssert.forEach(function (test) {
    // diffPath is not always defined.
    assert.ok(test.isWithinMisMatchTolerance, 'Regression found, see ' + test.diffPath || 0);
  });
};

describe('frontend testing', function () {
  var client = {};

  this.timeout(99999);

  before(function (done) {
    client = webdriverio.remote({
      desiredCapabilities: config.capabilities
    });
    client.init(done);
    webdrivercss.init(client);
  });

  config.tests.forEach(function (test) {
    it(test.name + ' should look the same', function (done) {
      client
        .url(test.path)
        .webdrivercss(test.name.toLowerCase(), config.breakpoints, assertScreenshots)
        .call(done);
    });
  });

  it('Should show the current date and time', function (done) {
    client
      .url('https://duckduckgo.com/')
      .setValue('#search_form_input_homepage', 'time')
      .click('#search_button_homepage')
      .webdrivercss('duck-time', {
        name: 'duck-time',
        exclude: [
          '#zero_click_wrapper .zci--time .time'
        ],
        screenWidth: [1024]
      }, assertScreenshots)
      .call(done);
  });

  it('Should show Google services', function (done) {
    client
      .url('https://www.google.it')
      .windowHandleSize({width: 1024, height: 768})
      .click('#gbwa a.gb_b.gb_xb')
      .webdrivercss('google-services', {
        name: 'google-services'
      }, assertScreenshots)
      .call(done);
  });

  after(function (done) {
    client.end(done);
  });
});
