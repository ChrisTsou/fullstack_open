import usersService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
  case 'USERS_INIT':
    return action.data
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch({
      type: 'USERS_INIT',
      data: users,
    })
  }
}

export default usersReducer
