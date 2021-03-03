const initialNotification = 'A notification'

const reducer = (state = initialNotification, action) => {
  switch (action.type) {
  case 'SET':
    return action.message
  case 'DELETE':
    return ''
  default:
    return state
  }
}

export default reducer
