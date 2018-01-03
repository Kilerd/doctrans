import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'

export const getData = (url, param, options = {}) => {
  return axios.get(`${url}`, options)
}

export const postData = (url, param, options = {}) => {
  return axios.post(`${url}`, param, options)
}
