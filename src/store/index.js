import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
// import * as reducers from '../reducers'
import login from '../reducers/login'

const history = createHistory()

const routingMiddleware = routerMiddleware(history)
const reducer = combineReducers({
  login,
  routing: routerReducer,
  form: formReducer,
})

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const initialState = {}

export default function configureStore(initialState) {
  const logger = createLogger()
  const store = createStore(
        reducer, 
        initialState,
        composeEnhancers(
            applyMiddleware(
                logger,
                routingMiddleware,
                thunk,
            ),
        ),
    )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}