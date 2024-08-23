import { useQuery } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'

import { nbpApi } from './api'
import { joinApiPaths } from './utils'

export type ExchangeRateTableDTO = Array<{
  table: string
  no: string
  effectiveDate: string
  rates: Array<{
    currency: string
    code: string
    mid: number
  }>
}>

const url = 'exchangerates/tables/a' as const

const getExchangeRatesTableARequest = () =>
  nbpApi<unknown, ExchangeRateTableDTO>(url)

export const useExchangeRatesTableAQuery = () =>
  useQuery({
    queryKey: ['exchangeRatesTableA'],
    queryFn: getExchangeRatesTableARequest,
    select: (data) => data[0],
  })

export const makeExchangeRatesTableAGetMock = (data: ExchangeRateTableDTO) =>
  http.get(joinApiPaths(url), () => HttpResponse.json(data))
