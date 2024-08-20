import { render, screen, waitFor } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { userEvent } from '@testing-library/user-event'

import { queryClient } from '~/queryClient'
import { runEmptyMockServer } from '~/utils/tests/runEmptyMockServer'
import {
  CurrencyDetailsDTO,
  makeCurrentAverageCurrencyExchangeRateGetMock,
} from '~/services/nbp'

import { CurrencyConverter } from '../CurrencyConverter'

const emptyMockServer = runEmptyMockServer()

const mockData: CurrencyDetailsDTO = {
  table: 'A',
  currency: 'dolar amerykański',
  code: 'USD',
  rates: [{ no: '161/A/NBP/2024', effectiveDate: '2024-08-20', mid: 4.0 }],
}
const mock = makeCurrentAverageCurrencyExchangeRateGetMock(mockData)

const renderWithProviders = (children: JSX.Element) => {
  const memoryHistory = createMemoryHistory({
    initialEntries: ['/currencies/USD'], // Pass your initial url
  })

  const rootRoute = createRootRoute()
  const testingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/currencies/$code',
    component: () => children,
  })
  const routeTree = rootRoute.addChildren([testingRoute])
  const router = createRouter({
    routeTree: routeTree,
    history: memoryHistory,
  })

  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider<typeof router> router={router} />
    </QueryClientProvider>
  )
}

const clickSubmit = async () => {
  const submitButton = screen.getByText('Convert')
  await waitFor(() => expect(submitButton).not.toBeDisabled())
  await userEvent.click(submitButton)
}

const clickSwap = async () => {
  const swapButton = screen.getByLabelText('swap currencies')
  await userEvent.click(swapButton)
}

const typeAmountInput = async (amount: string) => {
  const amountInput = screen.getByLabelText('Amount')
  await userEvent.type(amountInput, amount)
}

describe('CurrencyConverter', () => {
  it('should convert currency correctly', async () => {
    emptyMockServer.use(mock)
    renderWithProviders(<CurrencyConverter />)

    expect(await screen.findByText(/Currency converter/i)).toBeVisible()

    await typeAmountInput('100')
    await clickSubmit()

    await waitFor(() => {
      const convertedAmountText = screen.getByText('Converted amount: 25.0000')
      expect(convertedAmountText).toBeVisible()
    })
  })

  it('should convert currency correctly after swapping them', async () => {
    emptyMockServer.use(mock)
    renderWithProviders(<CurrencyConverter />)

    expect(await screen.findByText(/Currency converter/i)).toBeVisible()

    await typeAmountInput('100')
    await clickSwap()
    await clickSubmit()

    await waitFor(() => {
      const convertedAmountText = screen.getByText('Converted amount: 400.0000')
      expect(convertedAmountText).toBeVisible()
    })
  })

  it('displays validation error when amount is not entered', async () => {
    emptyMockServer.use(mock)
    renderWithProviders(<CurrencyConverter />)

    await clickSubmit()

    await waitFor(() => {
      expect(screen.getByText('Amount is required field')).toBeVisible()
    })
  })

  it('displays validation error when amount is less than 0', async () => {
    emptyMockServer.use(mock)
    renderWithProviders(<CurrencyConverter />)

    await typeAmountInput('-100')
    await clickSubmit()

    await waitFor(() => {
      expect(screen.getByText("Amount can't be less than zero")).toBeVisible()
    })
  })
})
