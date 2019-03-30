import React from 'react'
import ReactDOM from 'react-dom'


const Header = ({ course }) => {
    return <h1>{course.name}</h1>
}


const Part = ({ part }) => {
    return <p>
        {part.name} {part.exercises}
    </p>
}


const Content = ({ course }) => {

    return (
        <div>
            <Part part={course.parts[0]} />
            <Part part={course.parts[1]} />
            <Part part={course.parts[2]} />
        </div>
    )
}


const Total = ({ course }) => {
    let total = 0
    for (let i in course.parts) {
        total += course.parts[i].exercises
    }
    return <p>yhteensä {total} tehtävää.</p>
}


const App = () => {
    const course = {
        name: "Half Stack -sovelluskehitys",
        parts: [
            {
                name: "Reactin perusteet",
                exercises: 10
            },
            {
                name: "Tiedonvälitys propseilla",
                exercises: 7
            },
            {
                name: "Komponenttien tila",
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'))