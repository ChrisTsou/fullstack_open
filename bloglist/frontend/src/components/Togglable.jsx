import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef(
  ({ showButtonLabel, hideButtonLabel, children }, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
      setVisible(!visible)
    }

    useImperativeHandle(ref, () => ({
      toggleVisibility,
    }))

    return (
      <div>
        <div style={hideWhenVisible}>
          <button type="button" onClick={toggleVisibility}>
            {showButtonLabel}
          </button>
        </div>
        <div style={showWhenVisible}>
          {children}
          <button type="button" onClick={toggleVisibility}>
            {hideButtonLabel}
          </button>
        </div>
      </div>
    )
  }
)

Togglable.propTypes = {
  showButtonLabel: PropTypes.string.isRequired,
  hideButtonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
