
import { useState } from 'react'
const Header = ({ title }) => <h1>{title}</h1>;
const Options = ({ options }) =>
  options.map((option, index) => (
    <Button key={index} text={option.text} handleClick={option.onChange} />
  ));
const Button = ({ handleClick, text }) => (<button onClick={handleClick}>{text}</button>)

const Statistics = ({ statistics, hasFeedback }) =>
  hasFeedback ? (
    <tbody>
      {statistics.map((statistic, index) => (
        <Statistic
          key={index}
          text={statistic.text}
          value={statistic.value}
          isPercent={statistic.isPercent}
        />
      ))}
    </tbody>
  ) : (
    <tbody>
      <tr>
        <td>No feedback has been given.</td>
      </tr>
    </tbody>
  );
  const Statistic = ({ text, value, isPercent }) => (
    <tr>
      <td>{text}</td>
      <td>
        {value.toString()} {isPercent && "%"}
      </td>
    </tr>
  );
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 
  const total = good + neutral + bad;
  const average = (good - bad) / total || 0;
  const positive = (good / total) * 100 || 0;

  const feedbackButtons = [
    { text: "good", onChange: () => setGood((good) => good + 1) },
    { text: "neutral", onChange: () => setNeutral((neutral) => neutral + 1) },
    { text: "bad", onChange: () => setBad((bad) => bad + 1) },
  ];
  
  const statistics = [
    { text: "good", value: good, isPercent: false },
    { text: "neutral", value: neutral, isPercent: false },
    { text: "bad", value: bad, isPercent: false },
    { text: "Total", value: total, isPercent: false },
    { text: "Average", value: average, isPercent: false },
    { text: "Positive", value: positive, isPercent: true },
  ];
  return (
    <div>
      <Header title="give feedback" />
      <Options options={feedbackButtons} />
      <Header title="Statistics:" />
      <table>
        <Statistics statistics={statistics} hasFeedback={total !== 0} />
      </table>
    </div>
  )
}
export default App