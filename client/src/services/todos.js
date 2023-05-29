import axios from 'axios';

const baseUrl = window.location.hostname === "localhost" ? "http://localhost:7777" : "";

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getTodosOfUser = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/api/users/${id}/todos`, config);
  return response.data;
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(`${baseUrl}/api/todos`, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/api/todos/${id}`, newObject, config)
  return response.data
}

const deleteTodo = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/api/todos/${id}`, config)
  return response.data
}

export default {  create, update, getTodosOfUser, deleteTodo, setToken }
