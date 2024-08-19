import { useQuery } from '@tanstack/react-query'

import { nbpApi } from './api'

type ExchangeRateTableDTO = Array<{
  table: string
  no: string
  effectiveDate: string
  rates: Array<{
    currency: string
    code: string
    mid: number
  }>
}>

const getExchangeRatesTableA = () =>
  nbpApi<unknown, ExchangeRateTableDTO>('exchangerates/tables/a')

export const useExchangeRatesTableA = () =>
  useQuery({
    queryKey: ['exchangeRatesTableA'],
    queryFn: getExchangeRatesTableA,
    select: (data) => data[0],
  })
