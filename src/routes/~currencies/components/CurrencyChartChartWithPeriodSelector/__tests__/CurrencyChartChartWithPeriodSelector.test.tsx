import { screen, waitFor } from '@testing-library/react'

import { mockAndRender } from './mockAndRender'
import { userEvent } from '@testing-library/user-event'

describe('CurrencyChartChartWithPeriodSelector', () => {
  it('should sent correct request with default period on initial render', async () => {
    const spy = vi.fn()
    mockAndRender(spy)

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith('30')
    })
  })

  it('should sent correct request when some period button is clicked', async () => {
    const spy = vi.fn()
    mockAndRender(spy)

    const sevenDaysPeriodButton = screen.getByText('7d')
    await userEvent.click(sevenDaysPeriodButton)

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith('7')
    })
  })
})
