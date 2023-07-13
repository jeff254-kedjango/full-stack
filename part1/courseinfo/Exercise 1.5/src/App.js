const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {

  return (
    <>
    {props.parts.map(e => <div key={e.exercises}>< Part part = {e} /></div> )}
    </>
  )
}

const Total = (props) => {

  let total = 0

  props.exercises.forEach(val => {
    total = val.exercises + total
  })

  return (
    <p>Number of exercises {total}</p>
  )
}

const Part = (props) => {

  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  

  return (
    <>
      < Header course={course.name}/>
      < Content parts = {course.parts}/>
      < Total exercises = {course.parts}/>
    </>
  );
}

export default App;
