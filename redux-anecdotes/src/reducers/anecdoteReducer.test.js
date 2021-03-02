import deepFreeze from "deep-freeze";
import anecdoteReducer from "./anecdoteReducer";

describe("anecdoteReducer", () => {
  const initialState = [
    {
      content: "anecdote0",
      id: 0,
      votes: 0,
    },
    {
      content: "anecdote1",
      id: 1,
      votes: 0,
    },
  ];

  test("vote is incremented", () => {
    const action = {
      type: "VOTE",
      data: 1,
    };
    const state = initialState;

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);
    expect(newState).toEqual([
      state[0],
      {
        content: "anecdote1",
        id: 1,
        votes: 1,
      },
    ]);
  });

  test("anecdote is created", () => {
    const action = {
      type: "CREATE",
      data: "anecdote2",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);
    expect(newState[2].content).toEqual("anecdote2");
    expect(newState[2].id).toBeDefined();
    expect(newState[2].votes).toEqual(0);
  });
});
