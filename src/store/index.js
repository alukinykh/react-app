import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import * as reducers from '../reducers'

const history = createHistory()

const routingMiddleware = routerMiddleware(history)
const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
  form: formReducer,
})

const initialState = { }

export default function configureStore(initialState) {
  const logger = createLogger()
  const store = createStore(() => {}, {}, applyMiddleware(thunk, logger))

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}