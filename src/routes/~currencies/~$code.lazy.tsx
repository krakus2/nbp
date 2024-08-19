import { createLazyFileRoute } from '@tanstack/react-router'

import { Stack } from 'styled-system/jsx'

import {
  CurrencyChartChartWithPeriodSelector,
  CurrencyConverter,
} from './components'

export const Route = createLazyFileRoute('/currencies/$code')({
  component: Currency,
})

function Currency() {
  return (
    <Stack>
      <CurrencyChartChartWithPeriodSelector />
      <CurrencyConverter />
    </Stack>
  )
}
