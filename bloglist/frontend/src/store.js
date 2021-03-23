import { combineReducers, createStore, applyMiddleware } from 'redux'
import notificationReducer from './reducers/notification'
import userReducer from './reducers/user'
import blogsReducer from './reducers/blogs'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  notification: notificationReducer,
  user: userReducer,
  blogs: blogsReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
