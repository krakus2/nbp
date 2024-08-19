import { createRootRoute, Outlet } from '@tanstack/react-router'
import React from 'react'

import { css } from 'styled-system/css'

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      )

export const Route = createRootRoute({
  component: () => (
    <div className={css({ padding: '20px' })}>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
})
