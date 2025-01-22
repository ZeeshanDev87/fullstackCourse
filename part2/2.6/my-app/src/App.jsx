import { useState } from 'react'
import './App.css'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Search from './components/Search'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040123456' },
    { name: 'Ada Lovelace', number: '39445323523' },
    { name: 'Dan Abramov', number: '1243234345' },
    { name: 'Mary Poppendieck', number: '39236423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }
  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const add = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = search === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="container">
      <h2>Phonebook</h2>
      <Search search={search} handleSearchChange={handleSearchChange} />
      <PersonForm 
        add={add} 
        newName={newName} 
        handleChangeName={handleChangeName} 
        newNumber={newNumber} 
        handleChangeNumber={handleChangeNumber} 
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App