import { screen, within } from '@testing-library/react'

import { mockAndRender, mockData } from './mockAndRender'

describe('Index', () => {
  it('should show correct data in the currency table', async () => {
    mockAndRender()

    const headers = ['Currency', 'Code', 'Value']

    const headersElement = await screen.findByTestId('headers')

    for (const headerLabel of headers) {
      const headerElement = within(headersElement).getByText(headerLabel)
      expect(headerElement).toBeVisible()
    }

    for (const rateDetails of mockData[0].rates) {
      const tableRow = screen.getByTestId(rateDetails.code)

      const currencyName = within(tableRow).getByText(rateDetails.currency)
      expect(currencyName).toBeVisible()

      const code = within(tableRow).getByText(rateDetails.code)
      expect(code).toBeVisible()

      const value = within(tableRow).getByText(rateDetails.mid)
      expect(value).toBeVisible()
    }
  })
})
