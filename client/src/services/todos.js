import axios from 'axios';

const baseUrl = window.location.hostname === "localhost" ? "http://localhost:7777" : "";
//const baseUrl = '/api/todos'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/todos`) 
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(`${baseUrl}/api/todos`, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/api/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }
