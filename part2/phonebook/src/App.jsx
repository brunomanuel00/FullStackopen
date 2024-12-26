import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './service/persons'
import Notfication from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.error('Failed to fetch persons:', error)
      })
  }, [])

  const addName = e => {
    e.preventDefault()
    const newPerson = { name: newName, number: newPhone }

    const exist = persons.find(item => item.name === newPerson.name)

    if (!exist) {
      personService
        .create(newPerson)
        .then(personCreated => {
          setPersons(persons.concat(personCreated))
        })
      setNotification({ message: `Added ${newName}`, typeOfMessage: 'success' })
      setNewName('')
      setNewPhone('')
    } else if (exist.number !== newPerson.number) {
      const confirm = window.confirm(`${exist.name} is already added to phonebook, replace the old number with a new one?`)
      if (confirm) {

        const updatePerson = { id: exist.id, name: exist.name, number: newPerson.number }

        personService.update(updatePerson.id, updatePerson).then(returnedPerson => {
          setPersons(persons.map(person => person.name !== updatePerson.name ? person : returnedPerson))
        })
          .catch(error => {
            if (error.status === 404) {
              setNotification({ message: `Information of ${newName} has already been removed from server`, typeOfMessage: 'error' })
              setPersons(persons.filter(p => p.name !== newName))
            }
          })
      }
      setNewName('')
      setNewPhone('')
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleSearch = event => {
    setSearch(event.target.value)
  }

  const handleDelete = (id, name) => {
    const confirm = window.confirm(`Delete ${name}?`)
    if (confirm) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          console.error('Error deleting person:', error)
        })
    }
  }

  const filteredPeople = search
    ? persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notfication notification={notification} />
      <Filter search={search} handleSearch={handleSearch} />
      <h3>add a new</h3>
      <PersonForm formProps={{ addName, newName, newPhone, handleNameChange, handlePhoneChange }} />
      <h3>Numbers</h3>
      {filteredPeople.map(item =>
        <Persons key={item.id} person={item} handleDelete={handleDelete} />
      )}
    </div>
  )
}

export default App
