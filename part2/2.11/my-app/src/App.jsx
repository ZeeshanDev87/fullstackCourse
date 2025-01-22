import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) // Remove notes state
  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data) // Set persons data
      })
  }
  
  useEffect(hook, []) // Call hook when component is rendered
  console.log('render', persons.length, 'persons') // Log persons data

  return (
    <div>
      <Persons persons={persons} /> {/* Only show Persons component */}
    </div>
  );
};

const Persons = ({ persons }) => (
  <div>
    <h2>Persons</h2>
    {persons.map(person => (
      <p key={person.id}>
        {person.name} {person.number}
      </p>
    ))}
  </div>
);

export default App;
