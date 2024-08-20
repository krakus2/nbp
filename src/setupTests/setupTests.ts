import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as ResizeObserverModule from 'resize-observer-polyfill'
import '@testing-library/jest-dom/vitest'

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})

global.ResizeObserver = ResizeObserverModule.default
