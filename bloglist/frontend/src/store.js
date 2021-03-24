import { combineReducers, createStore, applyMiddleware } from 'redux'
import notificationReducer from './reducers/notification'
import currentUserReducer from './reducers/currentUser'
import blogsReducer from './reducers/blogs'
import usersReducer from './reducers/users'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  notification: notificationReducer,
  currentUser: currentUserReducer,
  blogs: blogsReducer,
  users: usersReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
