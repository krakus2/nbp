import { screen, waitFor } from '@testing-library/react'

import { mockAndRender, clickSubmit, clickSwap, typeAmountInput } from './utils'

describe('CurrencyConverter', () => {
  it('should convert currency correctly', async () => {
    mockAndRender()

    await typeAmountInput('100')
    await clickSubmit()

    await waitFor(() => {
      const convertedAmountText = screen.getByText('Converted amount: 25.0000')
      expect(convertedAmountText).toBeVisible()
    })
  })

  it('should convert currency correctly after swapping currencies', async () => {
    mockAndRender()

    await typeAmountInput('100')
    await clickSwap()
    await clickSubmit()

    await waitFor(() => {
      const convertedAmountText = screen.getByText('Converted amount: 400.0000')
      expect(convertedAmountText).toBeVisible()
    })
  })

  it('displays validation error when amount is not entered', async () => {
    mockAndRender()

    await clickSubmit()

    await waitFor(() => {
      expect(screen.getByText('Amount is required field')).toBeVisible()
    })
  })

  it('displays validation error when amount is less than 0', async () => {
    mockAndRender()

    await typeAmountInput('-100')
    await clickSubmit()

    await waitFor(() => {
      expect(screen.getByText("Amount can't be less than zero")).toBeVisible()
    })
  })
})
