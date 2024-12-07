import { useState } from "react";

const StatisticLine = props => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}{props.text === "positive" && "%"}</td>
    </tr>
  )
}

const Statistics = ({ coment, all }) => {
  const average = all > 0
    ? (((coment.good * 1) + (coment.neutral * 0) + (coment.bad * -1)) / all).toFixed(1)
    : 0
  const positive = (coment.good / all * 100).toFixed(1) || 0

  return (
    <table>
      <tbody>
        <StatisticLine value={coment.good} text="good" />
        <StatisticLine value={coment.neutral} text="neutral" />
        <StatisticLine value={coment.bad} text="bad" />
        <StatisticLine value={all} text="All" />
        <StatisticLine value={average} text="average" />
        <StatisticLine value={positive} text="positive" />
      </tbody>
    </table>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [coment, setComent] = useState({ good: 0, neutral: 0, bad: 0 })

  const comentAmount = props => {
    setComent({ ...coment, [props]: coment[props] + 1 })
  }
  const all = coment.good + coment.bad + coment.neutral

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => comentAmount('good')} text="good" />
      <Button handleClick={() => comentAmount('neutral')} text="neutral" />
      <Button handleClick={() => comentAmount('bad')} text="bad" />
      <h2>statistics</h2>
      {all ? <Statistics coment={coment} all={all} /> : <p>No feedback given</p>}
    </div>
  )
}

export default App