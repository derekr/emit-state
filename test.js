var createStateEmitter = require('./')
var test = require('tape').test
var sinon = require('sinon')
var EventEmitter = require('events').EventEmitter

test('Main export function should return EventEmitter', function (assert) {
  var store = createStateEmitter([{}])
  assert.ok(store instanceof EventEmitter, 'Returned EventEmitter')
  assert.end()
})

test('Main should throw if missing actions', function (assert) {
  assert.throws(createStateEmitter, 'Throws on missing')
  assert.end()
})

test('Test action callback is bound', function (assert) {
  var callback = sinon.spy()
  var store = createStateEmitter([{ type: 'testAction', fn: callback }])

  store.emit('testAction', 'payload')

  assert.ok(callback.called, 'testAction callback called')
  assert.ok(
    callback.calledWith(store, 'payload'),
    'called with store and event `payload` string'
  )
  assert.end()
})
