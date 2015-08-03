# emit-state
[![Build Status](https://travis-ci.org/derekr/emit-state.svg)](https://travis-ci.org/derekr/emit-state)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

EventEmitter for mutating a single state object.

Inspired by [substack/virtual-dom-unidirectional-example](https://github.com/substack/virtual-dom-unidirectional-example).

## Installation

```
npm install emit-state
```

## Usage

```js
var createStateEmitter = require('emit-state')
var actions = require('./actions.js')

var store = createStateEmitter(actions)
store.on('update', function (newState, oldState) {
  // main render loop
  // this is fired anytime there is a state change from
  // the registered actions
})

// Kick off initial action
store.emit('init')
```

*actions.js*
```js
var xhr = require('xhr')

module.exports = [
  {
    type: 'init',
    fn: function (store) {
      store.emit('fetchSomethingAsync')
    }
  },

  {
    type: 'fetchSomethingAsync',
    fn: function (store) {
      store.emit('fetchingSomething')
      xhr(
        { method: 'GET', url: 'http://someapi.com' },
        function (err, resp, body) {
          if (err) {
            store.emit('fetchFailed', err)
            return
          }

          store.emit('updateItems', body)
        }
      )
    }
  },

  {
    type: 'updateItems',
    fn: function (store, items) {
      var state = store.getState()
      state.isFetching = false
      state.fetchFailed = false
      state.items = items
      return state
    }
  },

  {
    type: 'fetchingSomething',
    fn: function (store) {
      var state = store.getState()
      state.isFetching = true
      return state
    }
  },

  type: 'fetchFailed',
  fn: function (store) {
    var state = store.getState()
    state.isFetching = false
    state.fetchFailed = true
    return state
  }
]
```
