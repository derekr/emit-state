var EventEmitter = require('events').EventEmitter
var isarray = require('isarray')

var state = {}

function getState () {
  return state
}

function updateState (store, newState) {
  store.emit('update', newState, state)
  state = newState
}

module.exports = function (actions, initial) {
  actions = !isarray(actions) ? [] : actions
  state = initial || {}

  var store = new EventEmitter()

  store.getState = getState

  actions.forEach(function (action) {
    store.on(action.type, function (payload) {
      var newState = action.fn.call(null, store, payload)

      if (!newState) return

      updateState(store, newState)
    })
  })

  return store
}
