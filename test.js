var createStateEmitter = require('./')
var test = require('tape').test
var sinon = require('sinon')
var EventEmitter = require('events').EventEmitter

test('Main export function should return EventEmitter', function (assert) {
  var store = createStateEmitter([{}])
  assert.ok(store instanceof EventEmitter, 'returned EventEmitter')
  assert.end()
})

test('Main should throw if missing actions', function (assert) {
  assert.throws(createStateEmitter, 'throws on missing')
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

test(
  'Returned state from aciton should update global state',
  function (assert) {
    assert.plan(2)

    var actions = [{
      type: 'updateState',
      fn: function (store) {
        var state = store.getState()
        state.updated = true
        return state
      }
    }]

    var store = createStateEmitter(actions)

    assert.notOk(store.getState().updated, 'state.updated initially is not true')
    store.on('update', function (state) {
      assert.ok(state.updated, 'after action state.updated is true')
      assert.end()
    })
    store.emit('updateState')
  }
)
