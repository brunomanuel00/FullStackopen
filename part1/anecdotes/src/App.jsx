import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
]

const App = () => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0
  })


  function handleAnecdote() {
    const randomNum = Math.floor(Math.random() * 8)
    setSelected(randomNum)
  }

  function handleVote() {
    setPoints({ ...points, [selected]: points[selected] + 1 })
  }

  const mostVotedIndex = Object.keys(points).reduce((maxIndex, currentIndex) =>
    points[currentIndex] > points[maxIndex] ? currentIndex : maxIndex
    , 0)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br />
      <p>has {points[selected]} votes</p>
      <br />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleAnecdote}>next anecdote</button>

      <h2>Anecdote with most votes</h2>
      {anecdotes[mostVotedIndex]}
      <p>has {points[mostVotedIndex]} votes</p>
    </div>
  )
}

export default App