import { useQuery } from '@tanstack/react-query'
import { compile } from 'path-to-regexp'
import { http, HttpResponse } from 'msw'

import { nbpApi } from './api'
import { CurrencyDetailsDTO } from './dtos'
import { joinApiPaths } from './utils'

export const url = 'exchangerates/rates/a/:code' as const

const getCurrentAverageCurrencyExchangeRateRequest = (code: string) =>
  nbpApi<unknown, CurrencyDetailsDTO>(compile<{ code: string }>(url)({ code }))

export const useCurrentAverageCurrencyExchangeRateQuery = (code: string) =>
  useQuery({
    queryKey: ['currencyDetails', code],
    queryFn: () => getCurrentAverageCurrencyExchangeRateRequest(code),
    select: (data) => {
      return data.rates[0].mid
    },
  })

export const makeCurrentAverageCurrencyExchangeRateGetMock = (
  data: CurrencyDetailsDTO
) => http.get(joinApiPaths(url), () => HttpResponse.json(data))
