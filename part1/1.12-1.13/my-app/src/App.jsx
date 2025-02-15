import { useState } from 'react'
import './App.css' // Import the CSS file

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const voteAnecdote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVotes = Math.max(...votes)
  const mostVotedAnecdotes = anecdotes
    .map((anecdote, index) => ({ anecdote, votes: votes[index] }))
    .filter(anecdote => anecdote.votes === mostVotes)

  return (
    <div className="app">
      <h1>Anecdote of the day</h1>
      <p className="anecdote">{anecdotes[selected]}</p>
      <p>Has <b>{votes[selected]}</b> votes</p>
      <button className="vote" onClick={voteAnecdote}>Vote</button>
      <button className="button" onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>Next Anecdote</button>
      {mostVotes > 0 && (
        <div>
          <h1>Anecdote(s) with most votes</h1>
          {mostVotedAnecdotes.map((anecdote, index) => (
            <div key={index}>
              <p className="anecdote">{index + 1}. {anecdote.anecdote}
              <span style={{marginLeft: '40px'}}>Has <b>{anecdote.votes}</b> votes</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App