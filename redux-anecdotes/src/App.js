import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { anecdoteVote } from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a0, a1) => a1.votes - a0.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => dispatch(anecdoteVote(anecdote.id))}>
                vote
              </button>
            </div>
          </div>
        ))}
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;
