import axios from 'axios'

export const nbpApi = axios.create({
  baseURL: 'http://api.nbp.pl/api/',
})

nbpApi.interceptors.response.use(({ data }) => data)
