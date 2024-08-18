import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

// Create an instance of Axios with the base URL set to the NBP API
const nbpApi = axios.create({
  baseURL: 'http://api.nbp.pl/api/',
})

nbpApi.interceptors.response.use(({ data }) => data)

interface Rate {
  currency: string
  code: string
  mid: number
}

interface ExchangeRateTable {
  table: string
  no: string
  effectiveDate: string
  rates: Rate[]
}

const getExchangeRatesTableA = () =>
  nbpApi<unknown, Array<ExchangeRateTable>>('exchangerates/tables/a')

export const useGetExchangeRatesTableA = () =>
  useQuery({
    queryKey: ['exchangeRatesTableA'],
    queryFn: getExchangeRatesTableA,
    select: (data) => data[0],
  })
