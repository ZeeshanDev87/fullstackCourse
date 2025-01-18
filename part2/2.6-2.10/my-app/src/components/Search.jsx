const Search = ({ search, handleSearchChange }) => {
  return (
    <div className="input-group">
      <label>
        Search: 
        <input 
          value={search} 
          onChange={handleSearchChange} 
        />
      </label>
    </div>
  )
}

export default Search
