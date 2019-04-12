import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ value, onChange }) => {
  return (
    <div>
      Rajaa näytettäviä:
      <input value={value} onChange={
        (e) => { onChange(e.target.value.trim().toLowerCase()) }
      } />
    </div >
  )
}


const PersonForm = ({
  onSubmit, onNameChanged, onPhoneChanged,
  name, phone }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        nimi: <input id="nameInput" value={name} onChange={onNameChanged} />
      </div>
      <div>
        numero: <input id="phoneInput" value={phone} onChange={onPhoneChanged} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}


const Persons = ({ persons, filter }) => {
  const shownPersons =
    filter === ""
      ? persons
      : persons.filter(p => {
        return p.name.toLowerCase().indexOf(filter) >= 0
      })
  return (shownPersons.map(p => (
    <p key={p.name}>{p.name} {p.phone}</p>
  )))
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '123-321123' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChanged = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChanged = (event) => {
    setNewPhone(event.target.value)
  }

  const handleSubmitClicked = (event) => {
    event.preventDefault()
    const newNameTrimmed = newName.trim()
    const isKnown =
      persons.find(p => p.name === newNameTrimmed) !== undefined
    const isEmpty = newNameTrimmed.length === 0
    if (isKnown) {
      alert(`${newName} on jo luettelossa!`)
    } else if (isEmpty) {
      // nop -- kieltäydytään hiljaa tallentamasta
    } else {
      const newPerson = { name: newNameTrimmed, phone: newPhone }
      const newPersons = [...persons, newPerson]
      setPersons(newPersons)
      setNewName("")
      setNewPhone("")
    }
  }


  return (
    <div>
      <div>{newName} {newPhone}</div>
      <h2>Puhelinluettelo</h2>
      <Filter value={filter} onChange={(x) => { setFilter(x.toLowerCase()) }} />
      <h3>Lisää uusi</h3>
      <PersonForm
        name={newName}
        phone={newPhone}
        onSubmit={handleSubmitClicked}
        onNameChanged={handleNameChanged}
        onPhoneChanged={handlePhoneChanged} />
      <h3>Numerot</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  )

}

export default App