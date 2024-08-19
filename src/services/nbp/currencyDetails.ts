import { useQuery } from '@tanstack/react-query'

import { nbpApi } from './api'
import type { CurrencyCode } from './domain'

interface ExchangeRateDTO {
  no: string
  effectiveDate: string
  mid: number
}

interface CurrencyDetailsDTO {
  table: string
  currency: string
  code: CurrencyCode
  rates: ExchangeRateDTO[]
}

interface CurrencyDetailsRequestParams {
  code: CurrencyCode
  // TODO: Think about the name
  range: number
}

const getCurrencyDetails = ({ code, range }: CurrencyDetailsRequestParams) =>
  nbpApi<unknown, CurrencyDetailsDTO>(
    `exchangerates/rates/a/${code}/last/${range}/?format=json`
  )

export const useCurrencyDetails = (params: CurrencyDetailsRequestParams) =>
  useQuery({
    queryKey: ['currencyDetails', params],
    queryFn: () => getCurrencyDetails(params),
  })
