import { useQuery } from '@tanstack/react-query'

import { nbpApi } from './api'
import type { CurrencyCode } from './domain'

interface RateDTO {
  currency: string
  code: CurrencyCode
  mid: number
}

interface ExchangeRateTableDTO {
  table: string
  no: string
  effectiveDate: string
  rates: RateDTO[]
}

const getExchangeRatesTableA = () =>
  nbpApi<unknown, Array<ExchangeRateTableDTO>>('exchangerates/tables/a')

export const useExchangeRatesTableA = () =>
  useQuery({
    queryKey: ['exchangeRatesTableA'],
    queryFn: getExchangeRatesTableA,
    select: (data) => data[0],
  })
