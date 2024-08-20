import {
  CurrencyDetailsDTO,
  makeCurrentAverageCurrencyExchangeRateGetMock,
} from '~/services/nbp'
import { runEmptyMockServer } from '~/utils/tests/runEmptyMockServer'
import { renderTestComponentWithRouter } from '~/utils/tests/renderTestComponent'

import { CurrencyConverter } from '../CurrencyConverter'

const emptyMockServer = runEmptyMockServer()

const mockData: CurrencyDetailsDTO = {
  table: 'A',
  currency: 'dolar amerykański',
  code: 'USD',
  rates: [{ no: '161/A/NBP/2024', effectiveDate: '2024-08-20', mid: 4.0 }],
}

const currentAverageCurrencyExchangeRateGetMock =
  makeCurrentAverageCurrencyExchangeRateGetMock(mockData)

export const mockAndRender = () => {
  emptyMockServer.use(currentAverageCurrencyExchangeRateGetMock)

  renderTestComponentWithRouter(<CurrencyConverter />, {
    path: '/currencies/$code',
    historyEntry: '/currencies/USD',
  })
}
