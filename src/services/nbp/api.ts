import axios from 'axios'

export const BASE_NBP_API_URL = 'https://api.nbp.pl/api/'

export const nbpApi = axios.create({
  baseURL: BASE_NBP_API_URL,
})

nbpApi.interceptors.response.use(({ data }) => data)
