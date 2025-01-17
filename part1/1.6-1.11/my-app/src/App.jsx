import { useState } from 'react'

const Button = (props) => {
  return <button style= {props.style} onClick={props.clickFunction}>{props.text}</button>
}

const StatisticLine = ({ text, value, color }) => {
  return (
    <tr style={{ backgroundColor: color }}>
      <td style={{ padding: '5px', textAlign: 'left' }}>{text}</td>
      <td style={{ padding: '5px', textAlign: 'left' }}>{value}</td>
    </tr>
  )
} 

const Statistics = (props) => {
  const { good, neutral, bad, total, stat } = props;
  if (total === 0) {
    return <p>No feedback given yet</p>
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table style={{ borderCollapse: 'collapse', width: '50%' }}>
        <tbody>
          <StatisticLine text="Good" value={good} color="#d4edda" />
          <StatisticLine text="Neutral" value={neutral} color="#fff3cd" />
          <StatisticLine text="Bad" value={bad} color="#f8d7da" />
          <StatisticLine text="Total Reviews" value={total} color="#d1ecf1" />
          <StatisticLine text="Average Reviews" value={total ? (neutral/total*100).toFixed(2) + '%' : '0%'} color="#d1ecf1" />
          <StatisticLine text="Positive Reviews" value={total ? (good/total*100).toFixed(2) + '%' : '0%'} color="#d1ecf1" />
        </tbody>
      </table>
      <h3 style={{textAlign:'start'}}>Reviews History:</h3>
      <p>{stat.join(', ')}</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [stat, setStat] = useState([])
  const total = good + neutral + bad;
  const goodReview = () =>{
    setGood(good+1);
    setStat([...stat,'Good']);
  }
  const badReview = () =>{
    setBad(bad+1);
    setStat([...stat,'Bad']);
  }
  const neutralReview = () =>{
    setNeutral(neutral+1);
    setStat([...stat,'Neutral']);
  }
  return (
    <div>
      <h1>Feedback Page</h1>
      <Button  style={{width: '80px', margin: '10px', backgroundColor: '#2896e1', border:'none', padding:'10px',borderRadius:'5px'}} clickFunction={goodReview} text='Good'/>
      <Button  style={{width: '80px', margin: '10px', backgroundColor: '#9c63a3', border:'none', padding:'10px',borderRadius:'5px'}}  clickFunction={neutralReview} text='Neutral'/>
      <Button style={{width: '80px', margin: '10px', backgroundColor: '#73d5f6', border:'none', padding:'10px',borderRadius:'5px'}}   clickFunction={badReview} text='Bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} stat={stat} />
    </div>
  )
}

export default App