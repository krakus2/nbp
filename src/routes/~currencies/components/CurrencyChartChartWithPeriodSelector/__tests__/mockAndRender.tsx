import type { Mock } from 'vitest'

import { CurrencyDetailsDTO, makeCurrencyDetailsGetMock } from '~/services/nbp'
import { runEmptyMockServer } from '~/utils/tests/runEmptyMockServer'
import { renderTestComponentWithRouter } from '~/utils/tests/renderTestComponent'

import { CurrencyChartChartWithPeriodSelector } from '../CurrencyChartChartWithPeriodSelector'

const emptyMockServer = runEmptyMockServer()

const mockData: CurrencyDetailsDTO = {
  table: 'A',
  currency: 'dolar amerykański',
  code: 'USD',
  rates: [
    { no: '161/A/NBP/2024', effectiveDate: '2024-08-20', mid: 4.0 },
    { no: '160/A/NBP/2024', effectiveDate: '2024-08-19', mid: 3.9 },
    { no: '159/A/NBP/2024', effectiveDate: '2024-08-18', mid: 3.8 },
    { no: '158/A/NBP/2024', effectiveDate: '2024-08-17', mid: 3.95 },
    { no: '157/A/NBP/2024', effectiveDate: '2024-08-16', mid: 3.88 },
    { no: '156/A/NBP/2024', effectiveDate: '2024-08-15', mid: 3.87 },
    { no: '155/A/NBP/2024', effectiveDate: '2024-08-14', mid: 3.86 },
  ],
}

export const mockAndRender = (spy?: Mock) => {
  const currencyDetailsGetMock = makeCurrencyDetailsGetMock(mockData, spy)
  emptyMockServer.use(currencyDetailsGetMock)

  renderTestComponentWithRouter(<CurrencyChartChartWithPeriodSelector />, {
    path: '/currencies/$code',
    historyEntry: '/currencies/USD',
  })
}
