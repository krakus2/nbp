import { createLazyFileRoute } from '@tanstack/react-router'

import { Stack } from 'styled-system/jsx'

import { useExchangeRatesTableA } from '~/services/nbp'

import { CurrenciesTable } from './components'

export const Route = createLazyFileRoute('/(index)/')({
  component: Index,
})

function Index() {
  const { data } = useExchangeRatesTableA()

  if (!data) return null

  const tableData = data.rates.map(({ mid, ...rest }) => ({
    rate: mid,
    ...rest,
  }))

  return (
    <Stack maxWidth='800px' margin='0 auto'>
      <CurrenciesTable data={tableData} />
    </Stack>
  )
}
