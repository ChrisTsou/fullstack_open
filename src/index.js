import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Feedback = (props) => {
  return (
    <div>
      <h1>give feedback</h1>
      <br />
      <Button handleClick={() => props.setGood(props.good + 1)} text={"Good"} />
      <Button
        handleClick={() => props.setNeutral(props.neutral + 1)}
        text={"Neutral"}
      />
      <Button handleClick={() => props.setBad(props.bad + 1)} text={"Bad"} />
    </div>
  );
};

const RenderStat = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.num}</td>
  </tr>
);

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad;

  if (total == 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <RenderStat text="good" num={props.good} />
          <RenderStat text="neutral" num={props.neutral} />
          <RenderStat text="bad" num={props.bad} />
          <RenderStat text="all" num={total} />
          <RenderStat text="average" num={(props.good - props.bad) / total} />
          <RenderStat text="positive" num={(props.good / total) * 100} />
        </tbody>
      </table>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const Anecdote = (props) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[props.state.selection]}</p>
      <p>has {props.state.votes[props.state.selection]} votes</p>
      <Button
        handleClick={() => {
          const values = [...props.state.votes];
          values[props.state.selection] += 1;

          props.setState({ ...props.state, votes: values });
        }}
        text={"vote"}
      />
      <Button
        handleClick={() =>
          props.setState({
            ...props.state,
            selection: Math.floor(Math.random() * anecdotes.length),
          })
        }
        text={"Next anecdote"}
      />
      <h1>Top anecdote</h1>
      <p>
        {anecdotes[props.state.votes.indexOf(Math.max(...props.state.votes))]}
      </p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [anecdotesState, setAnecdotesState] = useState({
    selection: 0,
    votes: Array.apply(null, new Array(anecdotes.length)).map(
      Number.prototype.valueOf,
      0
    ),
  });

  return (
    <div>
      <Feedback
        good={good}
        setGood={setGood}
        neutral={neutral}
        setNeutral={setNeutral}
        bad={bad}
        setBad={setBad}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
      <Anecdote state={anecdotesState} setState={setAnecdotesState} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
