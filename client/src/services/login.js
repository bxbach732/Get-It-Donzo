import axios from 'axios'

const baseUrl = window.location.hostname === "localhost" ? "http://localhost:7777" : "";

const login = async credentials => {
  const response = await axios.post(`${baseUrl}/api/login`, credentials)
  return response.data
}

export default { login }