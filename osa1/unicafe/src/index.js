// unicafe step6

import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ label, handleClick }) => {
    return <button onClick={handleClick}>{label}</button>
}


const Statistic = ({ label, value, unit="" }) => {
    return <tr><td>{label}</td><td>{value} {unit}</td></tr>
}


const Statistics = ({ good, neutral, bad }) => {
    const totalCount = good + neutral + bad;

    if (totalCount === 0) {
        return <p>Ei yhtään palautetta annettu.</p>
    }
    const totalSum = 1 * good - 1 * bad;
    const average = totalSum / totalCount;
    const percentageGood = good / totalCount * 100;
    return (
        <table>
            <tbody>
                <Statistic label="hyvä" value={good} />
                <Statistic label="neutraali" value={neutral} />
                <Statistic label="huono" value={bad} />
                <Statistic label="yhteensä" value={totalCount} />
                <Statistic label="keskiarvo" value={average} />
                <Statistic label="positiivisia" value={percentageGood} unit="%" />
            </tbody>
        </table>
    )
}


const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>anna palautetta</h1>
            <p>
                <Button label="hyvä" handleClick={() => setGood(good + 1)} />
                <Button label="neutraali" handleClick={() => setNeutral(neutral + 1)} />
                <Button label="huono" handleClick={() => setBad(bad + 1)} />
            </p>

            <h1>statistiikka</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />

        </div>
    )
}


ReactDOM.render(<App />,
    document.getElementById('root')
)