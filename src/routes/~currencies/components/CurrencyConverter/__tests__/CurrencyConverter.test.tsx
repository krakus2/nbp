import { screen, waitFor } from '@testing-library/react'

import { mockAndRender } from './mockAndRender'
import * as PO from './pageObject'

describe('CurrencyConverter', () => {
  it('should convert currency correctly', async () => {
    mockAndRender()

    await PO.typeAmountInput('100')
    await PO.clickSubmit()

    await waitFor(() => {
      const convertedAmountText = screen.getByText('Converted amount: 25.0000')
      expect(convertedAmountText).toBeVisible()
    })
  })

  it('should convert currency correctly after swapping currencies', async () => {
    mockAndRender()

    await PO.typeAmountInput('100')
    await PO.clickSwap()
    await PO.clickSubmit()

    await waitFor(() => {
      const convertedAmountText = screen.getByText('Converted amount: 400.0000')
      expect(convertedAmountText).toBeVisible()
    })
  })

  it('displays validation error when amount is not entered', async () => {
    mockAndRender()

    await PO.clickSubmit()

    await waitFor(() => {
      expect(screen.getByText('Amount is required field')).toBeVisible()
    })
  })

  it('displays validation error when amount is less than 0', async () => {
    mockAndRender()

    await PO.typeAmountInput('-100')
    await PO.clickSubmit()

    await waitFor(() => {
      expect(screen.getByText("Amount can't be less than zero")).toBeVisible()
    })
  })
})
