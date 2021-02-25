import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const style = {
    color: notification.isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div id="notification" style={style}>
      {notification.message}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object,
}

export default Notification
