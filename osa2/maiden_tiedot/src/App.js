import React, { useState, useEffect } from 'react'
import axios from 'axios'


const COUNTRY_SERVICE_URL = "https://restcountries.eu/rest/v2/all"
const APIXU_KEY = "91a3de938b7244d48a081029191404"
const APIXU_URL = "https://api.apixu.com/v1/current.json"


const makeApixuQueryForCity = city => {
  return (
    APIXU_URL
    + "?key=" + APIXU_KEY
    + "&q=" + encodeURIComponent(city)
  )
}


const QueryForm = ({ onChange }) => {
  return (
    <div>
      Find countries:
      <input placeholder="esim. finland" onChange={onChange} />
    </div>
  )
}


const CountryFactCard = ({ countryRecord }) => {
  return (
    <div>
      <h2>{countryRecord.name}</h2>
      <p><strong>capital:</strong> {countryRecord.capital}</p>
      <p><strong>population</strong>: {countryRecord.population}</p>
      <h3><strong>languages:</strong></h3>
      <ul>
        {countryRecord.languages.map(l => <li key={l.name}>{l.name}</li>)}
      </ul>
      <p><img alt="{countryRecord.name} flag" src={countryRecord.flag}
        style={{ width: "200px", border: "solid black" }} />
      </p>
    </div>)
}


const WeatherCard = ({ weatherData, weatherCity }) => {
  if (weatherCity === undefined) {
    return <></>
  } else if (weatherData === undefined) {
    return <div><em>Haetaan säätietoja...</em></div>
  } else {
    const current = weatherData.data.current;
    const temperature = current.temp_c
    const windStrength = current.wind_kph
    const windDirection = current.wind_dir
    const symbolUrl = current.condition.icon
    return <div>
      <h3>Weather in {weatherCity}</h3>
      <div><strong>temperature:</strong> {temperature} &deg;C</div>
      <div><img src={symbolUrl} alt="weather symbol"></img></div>
      <div><strong>wind:</strong> {windStrength} kph, direction {windDirection} </div>
    </div>
  }
}


const QueryResult = ({ query, countryData, setWeatherCity }) => {
  if (query === "") {
    setWeatherCity(undefined)
    return <div><em>please enter a country name</em></div>
  }
  if (countryData === undefined) {
    return <div><em>fetching country data...</em></div>
  }
  const testMatchForQuery = countryRecord => {
    return countryRecord.name.toLowerCase().indexOf(query.toLowerCase()) >= 0
  }
  const matchingCountries = countryData.filter(c => testMatchForQuery(c))
  const matchCount = matchingCountries.length;
  if (matchCount === 1) {
    const matchingCountryRecord = matchingCountries[0]
    const matchingCountryCapital = matchingCountryRecord.capital
    setWeatherCity(matchingCountryCapital)
    return <CountryFactCard countryRecord={matchingCountryRecord} />
  } else {
    setWeatherCity(undefined)
    if (matchCount === 0) {
      return <div>no matches</div>
    } else if (matchCount > 30) {
      return <div>Too many matches! Please, give a more specific filter.</div>
    } else if (matchCount > 1) {
      const listItems = matchingCountries.map(c => <li key={c.name}>{c.name}</li>)
      return <ul>{listItems}</ul>
    }
  }
}



const App = () => {
  const [query, setQuery] = useState('');
  const [countryData, setCountryData] = useState(undefined)
  const [weatherData, setWeatherData] = useState(undefined)
  const [weatherCity, setWeatherCity] = useState(undefined)

  useEffect(() => {
    axios
      .get(COUNTRY_SERVICE_URL)
      .then((r) => {
        setCountryData(r.data)
      })
  }, [query])

  useEffect(() => {
    if (weatherCity === undefined) {
      setWeatherData(undefined)
    } else {
      axios
        .get(makeApixuQueryForCity(weatherCity))
        .then(
          r => setWeatherData(r)
        )
    }
  }, [weatherCity])

  return (
    <>
      <QueryForm onChange={e => setQuery(e.target.value)}></QueryForm>
      <QueryResult
        query={query}
        countryData={countryData}
        setWeatherCity={setWeatherCity}
      />
      <WeatherCard weatherCity={weatherCity} weatherData={weatherData} />
    </>
  )
}


export default App
