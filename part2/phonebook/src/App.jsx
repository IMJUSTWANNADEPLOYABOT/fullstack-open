import { useState, useEffect } from 'react'
import NewNameForm from './components/NewNameForm'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import axios from 'axios' //old version for data parsing
import server from './service/server'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filtered, setFiltered] = useState("")
  const [notification, setNotification] = useState("")
  const [style, setStyle] = useState("")


  useEffect(() => {
    server
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    }

    if (persons.some(item => item.name === newName)) {

      if (window.confirm(`${nameObject.name} already exist. Replace the old number with a new one?`)) {
        const personToUpdate = persons.find(n => n.name === newName)
        server
          .update(personToUpdate.id, nameObject)
          .then(() => {
            setPersons(persons.map(item => item.id == personToUpdate.id ? nameObject : item))
            setStyle("notify")
            setNotification(
              `Number for ${newName} updated`
            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setStyle("error")
            setNotification(`Information about ${personToUpdate.name} has already been deleted from server`)
          })
      }

      setNewName("")
      setNewNumber("")
      return
    }
    setStyle("notify")
    setNotification(
      `Added ${newName}`
    )
    setTimeout(() => {
      setNotification(null)
    }, 5000)

    server
      .create(nameObject)
      .then(newName => {
        setPersons(persons.concat(newName))
        setNewName("")
        setNewNumber("")
      })
      .catch(error => {
        console.log(`There's error, details — ${error}`)
      })
  }

  const showFiltered = filtered
    ? persons.filter(person => person.name.toLowerCase().includes(filtered.toLowerCase()))
    : persons

  const handleFiltered = (event) => {
    setFiltered(event.target.value)
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const clearNumber = (id) => {

    const personToDelete = persons.find(n => n.id === id)

    if (window.confirm(`Are you sure to delete ${personToDelete.name}?`)) {
      server
        .clear(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          setStyle("error")
          setNotification(`Information about ${personToDelete.name} has already been deleted from server`)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} style={style} />
      <Filter
        handleFiltered={handleFiltered}
        filtered={filtered}
      />
      <h2>Add a new</h2>
      <NewNameForm
        addName={addName}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Numbers showFiltered={showFiltered} clearNumber={clearNumber} />
    </div>
  )
}

export default App