import { useQuery } from '@tanstack/react-query'
import { compile } from 'path-to-regexp'
import { http, HttpResponse } from 'msw'

import { nbpApi } from './api'
import { CurrencyDetailsDTO } from './dtos'

export const currentAverageCurrencyExchangeRateUrl =
  'exchangerates/rates/a/:code' as const

const getCurrentAverageCurrencyExchangeRateRequest = (code: string) =>
  nbpApi<unknown, CurrencyDetailsDTO>(
    compile<{ code: string }>(currentAverageCurrencyExchangeRateUrl)({ code })
  )

export const useCurrentAverageCurrencyExchangeRate = (code: string) =>
  useQuery({
    queryKey: ['currencyDetails', code],
    queryFn: () => getCurrentAverageCurrencyExchangeRateRequest(code),
    select: (data) => data.rates[0].mid,
  })

export const currentAverageCurrencyExchangeRateGetMock = (
  data: CurrencyDetailsDTO
) =>
  http.get(currentAverageCurrencyExchangeRateUrl, () => HttpResponse.json(data))
