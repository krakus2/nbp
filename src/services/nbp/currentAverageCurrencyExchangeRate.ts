import { useQuery } from '@tanstack/react-query'

import { nbpApi } from './api'
import type { CurrencyCode } from './domain'

interface CurrencyDetailsDTO {
  table: string
  currency: string
  code: CurrencyCode
  rates: Array<{ no: string; effectiveDate: string; mid: number }>
}

const getCurrentAverageCurrencyExchangeRate = (code: CurrencyCode) =>
  nbpApi<unknown, CurrencyDetailsDTO>(`exchangerates/rates/a/${code}`)

export const useCurrentAverageCurrencyExchangeRate = (code: CurrencyCode) =>
  useQuery({
    queryKey: ['currencyDetails', code],
    queryFn: () => getCurrentAverageCurrencyExchangeRate(code),
    select: (data) => data.rates[0].mid,
  })
