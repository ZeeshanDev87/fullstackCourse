import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./app.css"

const App = () => {
  const [value, setValue] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3001/countries')
      .then(response => setCountries(response.data))
      .catch(error => {
        console.error('Error fetching data:', error);
        setCountries([]);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const api_key = import.meta.env.VITE_SOME_KEY;
      console.log('API key:', api_key);
      if (!api_key) {
        console.error('API key is missing');
        return;
      }
      const capital = selectedCountry.capital;
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
        .then(response => setWeather(response.data))
        .catch(error => {
          console.error('Error fetching weather data:', error);
          setWeather(null);
        });
    }
  }, [selectedCountry]);

  const handleChange =(event)=>{
    setValue(event.target.value)
    setSelectedCountry('')
    setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())));
  }

  const handleShow = (country) => {
    setSelectedCountry(country);
  };

  const render = () => {
    if (value !== '') {
      if (filteredCountries.length === 0) {
        return <p>No Data found</p>;
      }
      if (filteredCountries.length > 10) {
        return <p>More than 10 countries, please specify more filters</p>;
      }
      if(filteredCountries.length==1){
        
        return(
          <div className="country-details">
            <h2>{filteredCountries[0].name.common}</h2>
            <p>Capital: {filteredCountries[0].capital}</p>
            <p>Population: {filteredCountries[0].population}</p>
            <p>Region: {filteredCountries[0].region}</p>
            <p>Subregion: {filteredCountries[0].subregion}</p>
            <p>Languages: {Object.values(filteredCountries[0].languages).join(', ')}</p>
            <img src={filteredCountries[0].flags.png} alt={`Flag of ${filteredCountries[0].name.common}`} className="flag" />
            <div className="weather-details">
                <h3>Weather in {filteredCountries[0].capital}</h3>
                {weather && (
                  <>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather icon" />
                    <p>Temperature: {weather.main.temp} °C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                  </>
                )}
              </div>
          </div>
        )
      }
      if (filteredCountries.length <= 10) {
        return (
          <ul className="country-list">
            {filteredCountries.map((country) => (
              <li key={country.cca3}>
                {country.name.common}
                <button onClick={() => handleShow(country)}>Show</button>
              </li>
            ))}
          </ul>
        );
      }
    }
    return null;
  }

  return (
    <div className="app-container">
      <form onSubmit={(e) => e.preventDefault()} className="search-form">Country:
        <input value={value} onChange={handleChange} className="search-input" />
      </form>
      <div>
        {render()}
        {selectedCountry && (
          <div className="country-details" style={{display: 'flex'}}>
            <div style={{width: '70%',display:'flex',justifyContent:'space-evenly'}}>
            <div>
            <h2>{selectedCountry.name.common}</h2>
            <p>Capital: {selectedCountry.capital}</p>
            <p>Population: {selectedCountry.population}</p>
            <p>Region: {selectedCountry.region}</p>
            <p>Subregion: {selectedCountry.subregion}</p>
            <p>Languages: {Object.values(selectedCountry.languages).join(', ')}</p>
            </div>
            <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} style={{width:'295px',height:'150px'}} className="flag" />
            </div>
            {weather && (
              <div className="weather-details" style={{width: '30%'}}>
                <h3>Weather in {selectedCountry.capital}</h3>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon" />
                <p>Temperature: {weather.main.temp} °C</p>
                <p>Weather: {weather.weather[0].description}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;