const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.data.name} {props.data.exercises}</p>
  )
}

const Content = (props) => {
  
  return (
    <>
      <Part data={props.data1} />
      <Part data={props.data2} />
      <Part data={props.data3} />
    </>
  )
}

const Total = (props) => {
  return (
    <p>Total of exercises: {props.total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header name={course} />
      <Content 
      data1={part1}
      data2={part2}
      data3={part3}
      
      />
      <Total total={part2.exercises + part1.exercises + part3.exercises} />
    </div>
  )
}

export default App
