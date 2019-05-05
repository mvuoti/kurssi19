import axios from 'axios'

const URL = "http://localhost:3001/persons"

const getAll = () => axios.get(URL).then(r => r.data)

const addNew = (person) => axios.post(URL, person).then(r => r.data)

const update = (person) =>
    axios
        .put(`${URL}/${person.id}`, person)
        .then(r => r.data)
        .catch(e => console.log(e))

const remove = (person) =>
    axios
        .delete(URL + `/${person.id}`)
        .then(r => person.name)
        .catch(e => console.log(e))

export default {
    getAll,
    addNew,
    update,
    remove
}