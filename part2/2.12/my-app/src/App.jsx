import { useState, useEffect } from 'react'
import services from './services/services'
import './App.css'

// New Notification component
const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={type === 'error' ? ' error' : 'success'}>
      {message}
    </div>
  );
};

const PersonForm = ({ add, newName, handleChangeName, newNumber, handleChangeNumber }) => (
  <form onSubmit={add}>
    <div className="input-group">
      <label>Name:<input value={newName} onChange={handleChangeName}/></label>
    </div>
    <div className="input-group">
      <label>Number:<input value={newNumber} onChange={handleChangeNumber} /></label>
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
);

const PersonsList = ({ personsToShow, del }) => (
  <div>
    {personsToShow.map(person => 
      <p key={person.id} className="person">
        <span><span>{person.name}</span><span>{person.number}</span></span>
        <button className='btn' onClick={() => del(person.id)}> Delete</button></p>
    )}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('success');

  useEffect(() => {
    services.getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const add = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      const id = existingPerson.id;
      if (window.confirm(`${newName} is already added to phonebook. Do you want to replace the old number with a new one?`)) {
        services.update(id, { ...existingPerson, number: newNumber })
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : updatedPerson));
            setNewName('');
            setNewNumber('');
            setErrorMessage(`Updated ${newName}'s number`);
            setNotificationType('success');
            setTimeout(() => setErrorMessage(null), 5000);
          })
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from server`);
            setNotificationType('error');
            setTimeout(() => setErrorMessage(null), 5000);
          });
      }
    } else {
      const personObject = { name: newName, number: newNumber };
      services.create(personObject).then(newPerson => {
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
        setErrorMessage(`Added ${newName}`);
        setNotificationType('success');
        setTimeout(() => setErrorMessage(null), 5000);
      });
    }
  };

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const del = (id) => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      services.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id));
        setErrorMessage(`Deleted ${person.name}`);
        setNotificationType('success');
        setTimeout(() => setErrorMessage(null), 5000);
      })
      .catch(error => {
        setErrorMessage(`Information of ${person.name} has already been removed from server`);
        setNotificationType('error');
        services.getAll().then(initialPersons => setPersons(initialPersons))
        setTimeout(() => setErrorMessage(null), 5000);
      });
    }
  };

  const personsToShow = search === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="container">
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={notificationType} />
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div className="input-group">
          <label>Search: <input value={search} onChange={handleChange(setSearch)}/></label>
        </div>
        <PersonForm 
          add={add} 
          newName={newName} 
          handleChangeName={handleChange(setNewName)} 
          newNumber={newNumber} 
          handleChangeNumber={handleChange(setNewNumber)} 
        />
      </div>
      <h2>Numbers</h2>
      <PersonsList personsToShow={personsToShow} del={del} />
    </div>
  );
};

export default App