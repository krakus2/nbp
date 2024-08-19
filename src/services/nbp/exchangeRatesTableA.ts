import { useQuery } from '@tanstack/react-query'

import { nbpApi } from './api'
import type { CurrencyCode } from './domain'

interface Rate {
  currency: string
  code: CurrencyCode
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

export const useExchangeRatesTableA = () =>
  useQuery({
    queryKey: ['exchangeRatesTableA'],
    queryFn: getExchangeRatesTableA,
    select: (data) => data[0],
  })
