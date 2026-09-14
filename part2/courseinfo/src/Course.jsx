import Header from "./Header"
import Content from "./Content"
import TotalExercises from "./TotalExercises"


const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <TotalExercises parts={course.parts} />
    </div>
  )
}

export default Course