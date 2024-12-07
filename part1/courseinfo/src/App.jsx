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
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total count={course.parts} />
    </div>
  )
}

const Header = ({ course }) => <h1>{course}</h1>



const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )

}

const Content = (props) => {
  return (
    <>
      {
        props.parts.map((item) => {
          return <Part key={item.name} part={item} />
        })
      }
    </>

  )


}

const Total = (props) => {
  const total = props.count.reduce((valor, current) => valor + current.exercises, 0)

  return (
    <p>Number of exercises {total} </p>
  )

}
export default App