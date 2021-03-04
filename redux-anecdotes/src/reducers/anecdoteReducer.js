import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'VOTE':
    return state.map((a) => (a.id !== action.data.id ? a : action.data))
  case 'CREATE':
    return [...state, action.data]
  case 'INIT_ANECDOTES':
    return action.data
  default:
    return state
  }
}

export const voteAnecdote = (anecdoteId) => async (dispatch) => {
  const votedAnecdote = await anecdoteService.vote(anecdoteId)
  dispatch({
    type: 'VOTE',
    data: votedAnecdote,
  })
}

export const createAnecdote = (content) => async (dispatch) => {
  const anecdote = await anecdoteService.createNew(content)
  dispatch({
    type: 'CREATE',
    data: anecdote,
  })
}

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  dispatch({
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  })
}

export default reducer
