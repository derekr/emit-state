var createStateEmitter = require('./')
var test = require('tape').test
var EventEmitter = require('events').EventEmitter

test('Main export function should return EventEmitter', function (assert) {
  var store = createStateEmitter({})
  assert.ok(store instanceof EventEmitter, 'Returned EventEmitter')
  assert.end()
})
