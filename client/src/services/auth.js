import axios from 'axios'

const baseUrl = window.location.hostname === "localhost" ? "http://localhost:7777" : "";

const login = async credentials => {
  const response = await axios.post(`${baseUrl}/api/login`, credentials)
  console.log(response.data)
  return response.data;
}

const register = async credentials => {
  const response = await axios.post(`${baseUrl}/api/users`, credentials)
  return response.data;
}

export default { login, register }