//anekdootit step3

import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(props.anecdotes.map(() => 0))
    const [winning, setWinning] = useState(0)
    const [votesGiven, setVotesGiven] = useState(0)

    const anecdotes = props.anecdotes
    
    const randomIndex = () => Math.floor(anecdotes.length * Math.random())

    const handleNextAnecdoteButtonClick = () => {
        setSelected(randomIndex())
    }

    const handleVoteButtonClick = () => {
        const newVotes = [...votes]
        newVotes[selected] += 1
        setVotes(newVotes)

        if (newVotes[selected] > newVotes[winning]) {
            setWinning(selected);
        }

        setVotesGiven(votesGiven + 1)
    }

    const winningMarkup = <>
        <div>
            {anecdotes[winning]}
        </div>
        <div>
            has {votes[winning]} votes.
            </div>
    </>

    return (
        <>
            <h1>Anecdote of the Day</h1>
            <div>
                {anecdotes[selected]}
            </div>
            <div>
                has {votes[selected] || 0} votes.
            </div>
            <div>
                <button onClick={handleVoteButtonClick}>vote</button>
                <button onClick={handleNextAnecdoteButtonClick}>next anecdote</button>
            </div>

            <h1>Anecdote with most votes</h1>
            { votesGiven > 0 ? winningMarkup : <p>no votes given</p> }
        </>
    )
}


const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)