import { useQuery } from '@tanstack/react-query'

import { nbpApi } from './api'
import { CurrencyDetailsDTO } from './dtos'

const getCurrentAverageCurrencyExchangeRate = (code: string) =>
  nbpApi<unknown, CurrencyDetailsDTO>(`exchangerates/rates/a/${code}`)

export const useCurrentAverageCurrencyExchangeRate = (code: string) =>
  useQuery({
    queryKey: ['currencyDetails', code],
    queryFn: () => getCurrentAverageCurrencyExchangeRate(code),
    select: (data) => data.rates[0].mid,
  })
