import axios from 'axios'

//const URL = "http://localhost:3001/api/persons"
//const URL = "http://mvuoti-fs19-3step10.herokuapp.com/api/persons"
const URL = "/api/persons"

const getAll = () =>
    axios
        .get(URL)
        .then(r => r.data)

const addNew = (person) =>
    axios
        .post(URL, person)
        .then(r => r.data)

const update = (person) =>
    axios
        .put(`${URL}/${person.id}`, person)
        .then(r => r.data)

const remove = (id) =>
    axios
        .delete(`${URL}/${id}`)
        .then(r => id)

export default {
    getAll,
    addNew,
    update,
    remove
}
