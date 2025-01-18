const PersonForm = ({ add, newName, handleChangeName, newNumber, handleChangeNumber }) => {
  return (
    <form onSubmit={add}>
      <div className="input-group">
        <label>
          Name: 
          <input 
            value={newName} 
            onChange={handleChangeName} 
          />
        </label>
      </div>
      <div className="input-group">
        <label>
          Number: 
          <input 
            value={newNumber} 
            onChange={handleChangeNumber} 
          />
        </label>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
