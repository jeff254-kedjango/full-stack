import { useState, useEffect } from 'react'

const App = () => {
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
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({ })
  function getNumber(l){
    return Math.floor(Math.random() * l)
  }

  const handleVotes = (props) => {
    const newState = points
    if(points[props] === undefined){
      newState[props] = 1
    } else {
      newState[props] = newState[props] + 1
    }
    return setPoints({...newState})
  }

  let arr = Object.values(points)
  let max = Math.max(...arr)
  let maxStatement = Object.keys(points).find(key => points[key] === max)


  return (
    <>
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      {points[selected] === undefined? <p>has 0 votes</p>:
      <p>has {points[selected]} votes</p>
    }
      <button onClick={() => handleVotes(selected)}>vote</button>
      <button onClick={() => setSelected(getNumber(anecdotes.length)) }>next anecdotes</button>
    </div>
      {max === -Infinity ? <><h1>Anecdote with most votes</h1><h4>No votes yet...cast your vote</h4></>:
      <>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[maxStatement]}</p>
        <p>has {max} votes</p>
      </>
      }
    </>
  )
}

export default App