import React from 'react'

const Header = ({name}) => {
    return(
        <h2>{name}</h2>
    )
}

const Total = ({sum}) => {
    let total = 0;
    sum.reduce((s, curr) => {
        total = total + curr.exercises
    }, sum.exercises )
    return (
        <h4>total of {total} exercises</h4>
    )
}

const Parts = ({arr }) => <p key={arr.id}>{arr.name}  {arr.exercises}</p>

const Content = ({data, id}) => {
    return (
        <div>
            {data.map((arr, id)=> <div key={id}> <Parts arr={arr} /> </div> )}
        </div>
    )
}
function Course({course}) {
  return (
    <div>
        <Header name ={course.name} />
        <Content data = {course.parts} id={course.id}/>
        < Total sum = {course.parts} />
    </div>
  )
}

export default Course