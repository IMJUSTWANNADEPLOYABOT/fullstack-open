const NewNameForm = ({ addName, newName, handleNewName, newNumber, handleNewNumber }) => {

    return (
        <form onSubmit={addName}>
            <div>
                name: <input
                    value={newName}
                    onChange={handleNewName}
                />
            </div>
            <div>
                phone: <input
                    value={newNumber}
                    onChange={handleNewNumber}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default NewNameForm


