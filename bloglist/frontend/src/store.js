import { combineReducers, createStore } from 'redux'
import notificationReducer from './reducers/notification'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({ notification: notificationReducer })

const store = createStore(reducer, composeWithDevTools())

export default store
