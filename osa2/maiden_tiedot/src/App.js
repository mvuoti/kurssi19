import React, { useState, useEffect } from 'react'
import axios from 'axios'


const QueryForm = ({ onChange }) => {
  return (
    <div>
      Find countries:
      <input placeholder="esim. finland" onChange={onChange} />
    </div>
  )
}

 
const CountryFactCard = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>languages:</h3>
      <ul>
          { country.languages.map(l => <li key={l.name}>{l.name}</li>) }
        </ul>
      <p><img alt="lipun kuva" src={country.flag} style={{width: "200px", border: "solid black"}}/></p>
    </div>)
}


const QueryResult = ({ query, countryData }) => {
  if (countryData === undefined) {
    return <div><em>fetching country data...</em></div>
  }
  const isMatchForQuery = countryRecord => {
    return countryRecord.name.toLowerCase().indexOf(query.toLowerCase()) >= 0
  }
  const matchingCountries = countryData.filter(c => isMatchForQuery(c))
  const matchCount = matchingCountries.length;
  let resultMarkup;
  if (matchCount === 0) {
    resultMarkup = <div>no matches</div>
  } else if (matchCount > 30) {
    resultMarkup = <div>Too many matches! Please, give a more specific filter.</div>
  } else if (matchCount > 1) {
    const listItems = matchingCountries.map(c => <li key={c.name}>{c.name}</li>)
    resultMarkup = <ul>{listItems}</ul>
  } else {
    resultMarkup = <CountryFactCard country={matchingCountries[0]} />
  }
  return resultMarkup
}


const App = () => {
  const SERVICE_URL = 'https://restcountries.eu/rest/v2/all'
  const [countryData, setCountryData] = useState(undefined);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios
      .get(SERVICE_URL)
      .then((r) => {
        setCountryData(r.data)
      })
  }, [])

  return (
    <>
      <QueryForm onChange={e => setQuery(e.target.value)}></QueryForm>
      <QueryResult countryData={countryData} query={query} />
    </>
  )
}


export default App
