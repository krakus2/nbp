import { render } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'

import { queryClient } from '~/queryClient'

type Options = {
  path: string
  historyEntry: string
}

export const renderTestComponentWithRouter = (
  children: JSX.Element,
  options: Options
) => {
  const { path, historyEntry } = options

  const memoryHistory = createMemoryHistory({
    initialEntries: [historyEntry],
  })

  const rootRoute = createRootRoute()
  const testingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path,
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
