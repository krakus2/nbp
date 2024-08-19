import { useQuery } from '@tanstack/react-query'

import { nbpApi } from './api'
import type { CurrencyCode } from './domain'

interface CurrencyDetailsDTO {
  table: string
  currency: string
  code: CurrencyCode
  rates: Array<{ no: string; effectiveDate: string; mid: number }>
}

interface CurrencyDetailsRequestParams {
  code: CurrencyCode
  period: number
}

const getCurrencyDetails = ({ code, period }: CurrencyDetailsRequestParams) =>
  nbpApi<unknown, CurrencyDetailsDTO>(
    `exchangerates/rates/a/${code}/last/${period}/?format=json`
  )

export const useCurrencyDetails = (params: CurrencyDetailsRequestParams) =>
  useQuery({
    queryKey: ['currencyDetails', params],
    queryFn: () => getCurrencyDetails(params),
  })
