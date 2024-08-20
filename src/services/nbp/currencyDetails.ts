import { useQuery } from '@tanstack/react-query'
import { compile } from 'path-to-regexp'
import { http, HttpResponse } from 'msw'

import { nbpApi } from './api'
import type { CurrencyDetailsDTO } from './dtos'

type CurrencyDetailsRequestParams = {
  code: string
  period: number
}

export const currencyDetailsUrl =
  'exchangerates/rates/a/:code/last/:period' as const

const getCurrencyDetailsRequest = ({
  code,
  period,
}: CurrencyDetailsRequestParams) =>
  nbpApi<unknown, CurrencyDetailsDTO>(
    compile<{ code: string; period: string }>(currencyDetailsUrl)({
      code,
      period: String(period),
    })
  )

export const useCurrencyDetails = (params: CurrencyDetailsRequestParams) =>
  useQuery({
    queryKey: ['currencyDetails', params],
    queryFn: () => getCurrencyDetailsRequest(params),
  })

export const makeCurrencyDetailsGetMock = (data: CurrencyDetailsDTO) =>
  http.get(currencyDetailsUrl, () => HttpResponse.json(data))
