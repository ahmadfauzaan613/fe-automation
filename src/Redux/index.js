import { applyMiddleware, createStore, combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import { reducer as userReducer } from './User/reducer'
import { reducer as taskReducer } from './Task/reducer'

export const reducer = combineReducers({
  user: userReducer,
  task: taskReducer,
})
export const store = createStore(reducer, applyMiddleware(thunk))
