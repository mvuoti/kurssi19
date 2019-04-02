import React from 'react'


const Header = ({ course }) => {
    return <h1>{course.name}</h1>
}


const Part = ({ part }) => {
    return <p>
        {part.name} {part.exercises}
    </p>
}


const Content = ({ course }) => {
    const partComponents = course.parts.map(
        part => <Part key={part.id} part={part}/>
    )
    return (
        <div>{partComponents}</div>
    )
}


const ExercisesTotal = ({course}) => {
    const reducer = (totalSum, part) => totalSum + part.exercises
    const totalCount = course.parts.reduce(reducer, 0)
    return <p>yhteensä {totalCount} tehtävää</p>
}


const Course = ({course}) => {
    return <>
        <Header course={course} />
        <Content course={course} />
        <ExercisesTotal course={course} />
    </>
}


export default Course;
