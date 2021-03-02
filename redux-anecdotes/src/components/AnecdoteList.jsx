import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  return (
    <>
      {anecdotes
        .sort((a0, a1) => a1.votes - a0.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has
              {' '}
              {anecdote.votes}
              <button onClick={() => dispatch(anecdoteVote(anecdote.id))}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList
