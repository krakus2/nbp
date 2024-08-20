import { BASE_NBP_API_URL } from './api'

export const joinApiPaths = (path: string) =>
  new URL(path, BASE_NBP_API_URL).href
