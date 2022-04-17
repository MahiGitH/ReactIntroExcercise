import React, { useState, useEffect } from "react";

const Header = ({ title }) => <h1>{title}</h1>;

const AnecdoteDisplay = ({ anecdote, votes }) => (
  <div>
    <p>{anecdote}</p>
    <p>{votes} votes</p>
  </div>
);

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [top, setTop] = useState(0);

  useEffect(() => {
    const mostVoted = votes.indexOf(Math.max.apply(null, votes));
    setTop(mostVoted);
  }, [votes]);

  const handleNext = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <div>
      <Header title="Anecdote of the Day" />
      <AnecdoteDisplay anecdote={anecdotes[selected]} votes={"has " + votes[selected]} />
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleNext} text="next anecdote" />
      <Header title="Anecdote with most votes" />
      <AnecdoteDisplay anecdote={anecdotes[top]} votes={"has " + votes[top]} />
    </div>
  );
};


export default App
