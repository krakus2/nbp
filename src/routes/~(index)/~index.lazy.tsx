import { createLazyFileRoute } from '@tanstack/react-router'

import { Stack } from 'styled-system/jsx'

import { useExchangeRatesTableA } from '~/services/nbp'
import { Heading } from '~/components/ui/heading'
import { Spinner } from '~/components/ui/spinner'

import { CurrenciesTable } from './components'

export const Route = createLazyFileRoute('/(index)/')({
  component: Index,
})

export function Index() {
  const { data, isPending, isError } = useExchangeRatesTableA()

  if (isError)
    return (
      <Heading size='xl' color='red' alignSelf='center' width='100%'>
        Error. Something went wrong
      </Heading>
    )

  if (isPending)
    return (
      <Stack maxWidth='100%' margin='0 auto' alignItems='center'>
        <Spinner size='xl' />
      </Stack>
    )

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
