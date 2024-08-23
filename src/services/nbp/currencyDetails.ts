import { useQuery } from '@tanstack/react-query'
import { compile } from 'path-to-regexp'
import { http, HttpResponse } from 'msw'
import type { Mock } from 'vitest'
import _last from 'lodash.last'

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

export const useCurrencyDetailsQuery = (params: CurrencyDetailsRequestParams) =>
  useQuery({
    queryKey: ['currencyDetails', params],
    queryFn: () => getCurrencyDetailsRequest(params),
  })

export const makeCurrencyDetailsGetMock = (
  data: CurrencyDetailsDTO,
  spy?: Mock
) =>
  http.get(joinApiPaths(url), async ({ request }) => {
    if (spy) {
      const period = _last(request.url.split('/'))
      spy(period)
    }

    return HttpResponse.json(data)
  })
