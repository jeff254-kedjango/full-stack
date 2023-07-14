import { useState } from 'react'


const Button = (props) => {
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
}


const StatisticLine = (props) => {
  if(props.text == 'positive'){
    return (
      <p>{props.text} {props.value} %</p>
    )
  }
  return (
    <p>{props.text} {props.value}</p>
  )
}

const Statistics = (props) => {
  const {good , neutral, bad, all, average, positive} = props
  return (
    <div>
        {all ? 
        <table>
          <tbody>
          <tr>
            <td><StatisticLine text="good" value ={good} /> </td>
          </tr>
          <tr>
            <td><StatisticLine text="neutral" value ={neutral} /> </td>
          </tr>
          <tr>
            <td><StatisticLine text="bad" value ={bad} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="all" value ={all} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="average" value ={average} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="positive" value ={positive} /></td>
          </tr>
          </tbody>
        </table>
        :
        <div>No feed back given</div>
        }
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let all = good + neutral + bad
  let average = ((good * 1) + (neutral * 0 ) + (bad * -1) ) / all
  let positive = (good / all) * 100



  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        < Button handleClick = {() => setGood(good + 1)} text = "good"/>
        < Button handleClick = {() => setNeutral(neutral + 1)} text = "neutral"/>
        < Button handleClick = {() => setBad(bad + 1)} text = "bad"/>
      </div>
      <h1>statistics</h1>
      <div>
        < Statistics 
          good = {good} 
          neutral = {neutral} 
          bad = {bad} 
          all = {all}
          average = {average}
          positive = {positive}
        />
      </div>

    </div>
  )
}

export default App