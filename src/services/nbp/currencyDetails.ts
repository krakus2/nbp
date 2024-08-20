import { useQuery } from '@tanstack/react-query'
import { compile } from 'path-to-regexp'
import { http, HttpResponse } from 'msw'

import { nbpApi } from './api'
import type { CurrencyDetailsDTO } from './dtos'
import { joinApiPaths } from './utils'

type CurrencyDetailsRequestParams = {
  code: string
  period: number
}

const url = 'exchangerates/rates/a/:code/last/:period' as const

const getCurrencyDetailsRequest = ({
  code,
  period,
}: CurrencyDetailsRequestParams) =>
  nbpApi<unknown, CurrencyDetailsDTO>(
    compile<{ code: string; period: string }>(url)({
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
  http.get(joinApiPaths(url), () => HttpResponse.json(data))
