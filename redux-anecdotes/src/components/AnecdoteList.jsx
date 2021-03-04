import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { notificationSet, notificationDelete } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const anecdoteFilter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const handleVote = (id) => () => {
    dispatch(anecdoteVote(id))
    dispatch(notificationSet('Voted!'))
    setTimeout(() => dispatch(notificationDelete()), 5000)
  }

  return (
    <>
      {anecdotes
        .filter((a) => a.content.toLowerCase().includes(anecdoteFilter.toLowerCase()))
        .sort((a0, a1) => a1.votes - a0.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has
              {' '}
              {anecdote.votes}
              <button type="button" onClick={handleVote(anecdote.id)}>
                vote
              </button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList