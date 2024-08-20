import { setupServer } from 'msw/node'
import { beforeAll, afterEach, afterAll, test } from 'vitest'

import { queryClient } from '~/queryClient'

const server = setupServer()

export const runEmptyMockServer = () => {
  beforeAll(() =>
    server.listen({
      onUnhandledRequest: (request, print) => {
        // INFO: How it works - https://github.com/mswjs/msw/issues/946#issuecomment-1202959063
        const url = new URL(request.url)

        test(`LOOK FOR THE MSW ERROR ABOVE FOR THE ${request.method} ${url.href}`, () => {})

        print.error()
      },
    })
  )

  afterEach(() => {
    queryClient.clear()
    server.resetHandlers()
  })

  afterAll(() => server.close())

  return server
}
