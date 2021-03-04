import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'VOTE':
    return state.map((a) => (a.id !== action.data
      ? a
      : {
        ...a,
        votes: a.votes + 1,
      }))
  case 'CREATE':
    return [...state, action.data]
  case 'INIT_ANECDOTES':
    return action.data
  default:
    return state
  }
}

export const anecdoteVote = (anecdoteId) => ({
  type: 'VOTE',
  data: anecdoteId,
})

export const createAnecdote = (anecdote) => ({
  type: 'CREATE',
  data: anecdote,
})

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  dispatch({
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  })
}

export default reducer
