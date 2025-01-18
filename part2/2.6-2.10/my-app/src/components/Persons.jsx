const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map(person => 
        <p key={person.name} className="person">
          {person.name} <span>{person.number}</span>
        </p>
      )}
    </div>
  )
}

export default Persons
