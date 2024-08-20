import {
  type ExchangeRateTableDTO,
  makeExchangeRatesTableAGetMock,
} from '~/services/nbp'
import { runEmptyMockServer } from '~/utils/tests/runEmptyMockServer'
import { renderTestComponentWithRouter } from '~/utils/tests/renderTestComponent'

import { Index } from '../~index.lazy'

const emptyMockServer = runEmptyMockServer()

export const mockData: ExchangeRateTableDTO = [
  {
    table: 'A',
    no: '161/A/NBP/2024',
    effectiveDate: '2024-08-20',
    rates: [
      {
        currency: 'bat (Tajlandia)',
        code: 'THB',
        mid: 0.1126,
      },
      {
        currency: 'dolar amerykański',
        code: 'USD',
        mid: 3.8506,
      },
      {
        currency: 'dolar australijski',
        code: 'AUD',
        mid: 2.5908,
      },
    ],
  },
]

export const mockAndRender = () => {
  const exchangeRatesTableAGetMock = makeExchangeRatesTableAGetMock(mockData)
  emptyMockServer.use(exchangeRatesTableAGetMock)

  renderTestComponentWithRouter(<Index />, { path: '/', historyEntry: '/' })
}
