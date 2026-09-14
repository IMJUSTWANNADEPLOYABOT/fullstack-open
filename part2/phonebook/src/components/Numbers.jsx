const Numbers = ({ showFiltered, clearNumber }) => {

    return (
        <>
            {showFiltered.map(person => (
                <div key={person.id}>{person.name} - {person.number}
                <button onClick={() => clearNumber(person.id)}>Delete</button>
                
                </div>
                
            ))}
            
        </>
    )
}

export default Numbers