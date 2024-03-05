import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://crio-location-selector.onrender.com/countries')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        setError('Failed to fetch countries');
        console.error('Error fetching countries:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then(response => {
          setStates(response.data);
        })
        .catch(error => {
          setError('Failed to fetch states');
          console.error('Error fetching states:', error);
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    // Fetch cities based on selected state
    if (selectedState) {
      axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then(response => {
          setCities(response.data);
        })
        .catch(error => {
          setError('Failed to fetch cities');
          console.error('Error fetching cities:', error);
        });
    }
  }, [selectedCountry, selectedState]);

  return (
    <div>
      {error && <p>Error: {error}</p>}

      <select className='form-control' value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)}>
        <option value="">Select Country</option>
        {countries.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>

      <select className='form-control' value={selectedState} onChange={e => setSelectedState(e.target.value)}>
        <option value="">Select State</option>
        {states.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      <select className='form-control' value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
        <option value="">Select City</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      <div>
        {selectedCity && (
          <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>
        )}
      </div>
    </div>
  );
};

export default App;
