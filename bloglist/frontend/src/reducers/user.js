const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'USER_LOGIN':
    return action.data
  case 'USER_LOGOUT':
    return null
  default:
    return state
  }
}

export const loginUser = (userObject) => {
  return {
    type: 'USER_LOGIN',
    data: userObject,
  }
}

export const logoutUser = () => {
  return {
    type: 'USER_LOGOUT',
  }
}

export default userReducer
