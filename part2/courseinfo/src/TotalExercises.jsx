const TotalExercises = ({ parts }) => {
    return (
        <p>
            <strong>Total exercises: {parts.reduce((acc, part) => {
                return acc + part.exercises 
            }, 0)} </strong>
        </p>
    )
}

export default TotalExercises