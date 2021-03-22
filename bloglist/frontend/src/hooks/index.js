import {
  createNotification,
  deleteNotification,
} from '../reducers/notification'
import { useDispatch, useSelector } from 'react-redux'

export const useNotification = () => {
  const dispatch = useDispatch()
  const existingNotification = useSelector((state) => state.notification)

  const notificationWithTimeout = (message, isError) => {
    if (existingNotification) {
      clearTimeout(existingNotification.timeout)
    }

    const timeout = setTimeout(() => {
      dispatch(deleteNotification())
    }, 5000)

    dispatch(
      createNotification({
        message,
        timeout,
        isError,
      })
    )
  }

  const notify = (message) => {
    notificationWithTimeout(message, false)
  }
  const error = (message) => {
    notificationWithTimeout(message, true)
  }

  return {
    notify,
    error,
  }
}
