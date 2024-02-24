import { applyMiddleware, createStore, combineReducers } from 'redux'
import { thunk } from 'redux-thunk'

export const reducer = combineReducers({})
export const store = createStore(reducer, applyMiddleware(thunk))
