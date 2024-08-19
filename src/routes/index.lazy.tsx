import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'

import { Stack } from 'styled-system/jsx'

import { Table } from '~/components/ui/table'
import { IconButton } from '~/components/ui/icon-button'
import { useExchangeRatesTableA } from '~/services/nbp'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const { data } = useExchangeRatesTableA()

  if (!data) return null

  return (
    <div>
      <Stack maxWidth='800px' margin='0 auto'>
        <Table.Root>
          <Table.Head>
            <Table.Row>
              <Table.Header>Currency</Table.Header>
              <Table.Header>Code</Table.Header>
              <Table.Header>Value</Table.Header>
              <Table.Header></Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {data.rates.map(({ currency, code, mid: midRate }) => (
              <Table.Row key={code}>
                <Table.Cell>{currency}</Table.Cell>
                <Table.Cell>{code}</Table.Cell>
                <Table.Cell>{midRate}</Table.Cell>
                <Table.Cell>
                  <IconButton asChild size='xs' aria-label='currency details'>
                    <Link to='/currencies/$code' params={{ code }}>
                      <ArrowRightIcon />
                    </Link>
                  </IconButton>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Stack>
    </div>
  )
}
