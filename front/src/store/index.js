import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'
import ui from '../reducer/uiReducer'
import data from '../reducer/data'

const store = create()

export default store

function create() {
  const reducer = combineReducers({
    routing: routerReducer,
    ui,
    data
  })

  const args = applyMiddleware(thunk, promise, createLogger)
  const store = createStore(reducer, args)
  return store
}
