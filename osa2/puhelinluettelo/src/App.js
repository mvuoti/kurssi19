import React, { useState, useEffect } from 'react'
import PhoneDatabase from './phone_database'


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
  onSubmit, onNameChanged, onNumberChanged,
  name, number
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        nimi: <input id="nameInput" value={name} onChange={onNameChanged} />
      </div>
      <div>
        numero: <input id="numberInput" value={number} onChange={onNumberChanged} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}


const PersonList = ({ persons, filter, onRemove }) => {
  const shownPersons =
    filter === ""
      ? persons
      : persons.filter(p => {
        return p.name.toLowerCase().indexOf(filter) >= 0
      })
  return (shownPersons.map(p => {
    const removeButton = <button onClick={() => onRemove(p)}>poista</button>
    return <p key={p.name}>{p.name} {p.number} {removeButton}</p>
  }))
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(
    () => {
      PhoneDatabase.getAll().then(r => setPersons(r))
    },
    []
  )

  const handleNameChanged = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChanged = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmitClicked = (event) => {
    event.preventDefault()
    const newNameTrimmed = newName.trim()
    const oldEntry = persons.find(p => p.name === newNameTrimmed)
    const isKnown = oldEntry !== undefined
    const isEmpty = newNameTrimmed.length === 0
    if (isKnown) {
      if (window.confirm(`${newNameTrimmed} on jo luettelossa, päivitetäänkö numero?`)) {
        const updatedPerson = { ...oldEntry, number: newNumber }
        PhoneDatabase
          .update(updatedPerson)
          .then(() => {
            const newPersons =
              persons
                .filter(p => p.name !== updatedPerson.name)
                .concat([updatedPerson])
            setPersons(newPersons)
          })
      }
    } else if (isEmpty) {
      // nop -- kieltäydytään hiljaa tallentamasta
    } else {
      const newPerson = { name: newNameTrimmed, number: newNumber }
      PhoneDatabase
        .addNew(newPerson)
        .then(addedPerson => {
          const newPersons = [...persons, addedPerson]
          setPersons(newPersons)
          setNewName("")
          setNewNumber("")
        })
    }
  }


  const handleRemoveClicked = (personToBeRemoved) => {
    if (window.confirm(`Poistetaanko ${personToBeRemoved.name}`)) {
      PhoneDatabase
        .remove(personToBeRemoved)
        .then(removedName => {
          const newPersons = persons.filter(
            p => p.name !== removedName
          )
          setPersons(newPersons)
        })
    }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter value={filter} onChange={(x) => { setFilter(x.toLowerCase()) }} />
      <h3>Lisää uusi</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        onSubmit={handleSubmitClicked}
        onNameChanged={handleNameChanged}
        onNumberChanged={handleNumberChanged} />
      <h3>Numerot</h3>
      <PersonList persons={persons} filter={filter} onRemove={handleRemoveClicked} />
    </div>
  )

}

export default App