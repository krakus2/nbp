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
import {
  CurrencyDetailsDTO,
  makeCurrentAverageCurrencyExchangeRateGetMock,
} from '~/services/nbp'
import { runEmptyMockServer } from '~/utils/tests/runEmptyMockServer'

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

  const memoryHistory = createMemoryHistory({
    initialEntries: ['/currencies/USD'], // Pass your initial url
  })

  const rootRoute = createRootRoute()
  const testingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/currencies/$code',
    component: () => <CurrencyConverter />,
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

export const clickSubmit = async () => {
  const submitButton = screen.getByText('Convert')
  await waitFor(() => expect(submitButton).not.toBeDisabled())
  await userEvent.click(submitButton)
}

export const clickSwap = async () => {
  const swapButton = screen.getByLabelText('swap currencies')
  await userEvent.click(swapButton)
}

export const typeAmountInput = async (amount: string) => {
  const amountInput = screen.getByLabelText('Amount')
  await userEvent.type(amountInput, amount)
}
