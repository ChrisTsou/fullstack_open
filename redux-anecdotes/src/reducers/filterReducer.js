const reducer = (state = '', action) => {
  switch (action.type) {
  case 'FILTER_SET':
    return action.filter
  default:
    return state
  }
}

export const filterSet = (filter) => ({
  type: 'FILTER_SET',
  filter,
})

export default reducer
