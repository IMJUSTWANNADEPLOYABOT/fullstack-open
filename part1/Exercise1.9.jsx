import { useState } from 'react'

const Statistics = (props) => {

  if (props.good > 0 || props.bad > 0 || props.neutral > 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>Good {props.good}</p>
        <p>Neutral {props.neutral}</p>
        <p>Bad {props.bad} </p>
        <p>All {props.all} </p>
        <p>Average {props.average}</p>
        <p>Postivie {props.positive}%</p>
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
