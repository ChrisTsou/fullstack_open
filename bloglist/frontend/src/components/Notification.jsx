import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  }

  const severity = notification.isError ? 'error' : 'success'

  return (
    <Alert severity={severity} id="notification">
      {notification.message}
    </Alert>
  )
}

Notification.propTypes = {
  notification: PropTypes.object,
}

export default Notification
