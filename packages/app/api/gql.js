import axios from 'axios'

const API_BASE = process.env.API_BASE || 'localhost'
const API_PORT = process.env.API_PORT || '4000'
const API_ENDPOINT = process.env.API_ENDPOINT || '/api/graphql'

export const api = axios.create({
  baseURL: `http://${API_BASE}:${API_PORT}${API_ENDPOINT}`
})

export function gql (query, variables, http = api) {
  return http.post('/graphql', { query, variables })
}

api.interceptors.response.use(function (res) {
  if (res.data.errors) {
    const err = new Error(res.data.errors[0].message)
    err.response = res
    return Promise.reject(err)
  }
  return res.data.data
})
