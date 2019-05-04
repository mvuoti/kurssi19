import React, { useState, useEffect } from 'react'
import axios from 'axios'

const APIXU_KEY = "91a3de938b7244d48a081029191404"

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
      <p><img alt="lipun kuva" src={country.flag}
              style={{width: "200px", border: "solid black"}}/>
      </p>
    </div>)
}


const WeatherCard = ({ query, weatherData, setWeatherData }) => {
debugger;
  useEffect(() => {
    setTimeout(() => {
    axios
      .get("https://api.apixu.com/v1/current.json?key=91a3de938b7244d48a081029191404&q={query}")
      .then(r => {
        setWeatherData(r.data)
      })
    }, 1000)
  })
  if (weatherData === undefined) {
    return <div><em>Haetaan säätietoja...</em></div>
  } else {
    const temperature = weatherData.current.temp_c
    return <>
      {temperature}
    </>
  }
}


const QueryResult = ({ query, countryData, weatherData, setWeatherData }) => {
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
    const matchingCountryRecord = matchingCountries[0]
    const matchingCountryCapital = matchingCountryRecord.capital
    resultMarkup = <>
      <CountryFactCard country={matchingCountries[0]} />
      <WeatherCard query={query} weatherData={weatherData} setWeatherData={setWeatherData} />
    </>
  }
  return resultMarkup
}



const App = () => {
  const SERVICE_URL = 'https://restcountries.eu/rest/v2/all'
  const [countryData, setCountryData] = useState(undefined);
  const [weatherData, setWeatherData] = useState(undefined)
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
      <QueryResult countryData={countryData} weatherData={weatherData} setWeatherData={setWeatherData} query={query} />
    </>
  )
}


export default App
