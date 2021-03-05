import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationSet } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const handleVote = (id) => () => {
    props.voteAnecdote(id)
    props.notificationSet('Voted!', 5)
  }

  return (
    <>
      {props.anecdotes
        .filter((a) => a.content.toLowerCase().includes(props.anecdoteFilter.toLowerCase()))
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

const mapStateToProps = (state) => ({
  anecdotes: state.anecdotes,
  anecdoteFilter: state.filter,
})

const mapDispatchToProps = {
  notificationSet,
  voteAnecdote,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
