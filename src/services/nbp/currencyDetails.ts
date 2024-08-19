import { useQuery } from '@tanstack/react-query'

import { nbpApi } from './api'
import type { CurrencyDetailsDTO } from './dtos'

type CurrencyDetailsRequestParams = {
  code: string
  period: number
}

const getCurrencyDetails = ({ code, period }: CurrencyDetailsRequestParams) =>
  nbpApi<unknown, CurrencyDetailsDTO>(
    `exchangerates/rates/a/${code}/last/${period}`
  )

export const useCurrencyDetails = (params: CurrencyDetailsRequestParams) =>
  useQuery({
    queryKey: ['currencyDetails', params],
    queryFn: () => getCurrencyDetails(params),
  })
