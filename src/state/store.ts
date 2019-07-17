import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import { loadState, saveState } from './localStorage'
import { accounts, budgets, transactions } from './ducks'

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(logger, thunk))

const persistedState = loadState()
const store = createStore(
  combineReducers({ accounts, budgets, transactions }),
  persistedState,
  enhancer
)

store.subscribe(() => {
  saveState(store.getState())
})

export default store
