import { useState } from 'react'

const Statistics = (props) => {

  if (props.good > 0 || props.bad > 0 || props.neutral > 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <StatisticLine data={"Good"} value={props.good} />
        <StatisticLine data={"Neutral"} value={props.neutral} />
        <StatisticLine data={"Bad"} value={props.bad} />
        <StatisticLine data={"All"} value={props.all} />
        <StatisticLine data={"Average"} value={props.average} />
        <StatisticLine data={"Positive"} value={`${props.positive}%`} />
      </div>
    )
  }
  else {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
}

const StatisticLine = ({ data, value }) => {
  return (
    <>
      <p>{data} {value}</p>
    </>
  )
}

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good * 100) / all

  return (
    <div>
      <div>
        <h1>Give feedback</h1>
        <Button onClick={() => setGood(good + 1)} text="Good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
        <Button onClick={() => setBad(bad + 1)} text="Bad" />
      </div>

      <div>
        <Statistics all={all} average={average} good={good} bad={bad} positive={positive} neutral={neutral} />
      </div>
    </div>
  )
}

export default App
