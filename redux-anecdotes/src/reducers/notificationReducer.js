const reducer = (state = null, action) => {
  const stopPreviousTimeout = () => {
    if (state !== null) {
      clearTimeout(state.timeoutId)
    }
  }

  switch (action.type) {
  case 'NOTIFICATION_SET': {
    stopPreviousTimeout()

    return {
      message: action.message,
      timeoutId: action.timeoutId,
    }
  }
  case 'NOTICATION_DELETE':
    return null
  default:
    return state
  }
}

export const notificationSet = (message, seconds) => async (dispatch) => {
  const timeoutId = setTimeout(
    () => dispatch({
      type: 'NOTICATION_DELETE',
    }),
    seconds * 1000,
  )

  dispatch({
    type: 'NOTIFICATION_SET',
    message,
    timeoutId,
  })
}

export default reducer
