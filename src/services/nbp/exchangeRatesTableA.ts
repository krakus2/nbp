import { useQuery } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'

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

const exchangeRatesTableAUrl = 'exchangerates/tables/a' as const

const getExchangeRatesTableARequest = () =>
  nbpApi<unknown, ExchangeRateTableDTO>(exchangeRatesTableAUrl)

export const useExchangeRatesTableA = () =>
  useQuery({
    queryKey: ['exchangeRatesTableA'],
    queryFn: getExchangeRatesTableARequest,
    select: (data) => data[0],
  })

export const makeExchangeRatesTableAGetMock = (data: ExchangeRateTableDTO) =>
  http.get(exchangeRatesTableAUrl, () => HttpResponse.json(data))
