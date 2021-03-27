import React, { useState } from 'react'
import { Grid, Button } from '@material-ui/core'

const Togglable = ({ showButtonLabel, hideButtonLabel, children }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <Grid container direction="column" alignItems="flex-start" spacing={3}>
      {visible && <Grid item>{children}</Grid>}
      <Grid item>
        <Button
          component={Button}
          variant="contained"
          onClick={toggleVisibility}
        >
          {visible ? hideButtonLabel : showButtonLabel}
        </Button>
      </Grid>
    </Grid>
  )
}

export default Togglable
