import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'

import { Table } from '~/components/ui/table'
import { IconButton } from '~/components/ui/icon-button'

type CurrenciesTable = {
  data: Array<{ currency: string; code: string; rate: number }>
}

export const CurrenciesTable = ({ data }: CurrenciesTable) => (
  <Table.Root>
    <Table.Head>
      <Table.Row data-testid='headers'>
        <Table.Header>Currency</Table.Header>
        <Table.Header>Code</Table.Header>
        <Table.Header>Value</Table.Header>
        <Table.Header></Table.Header>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {data.map(({ currency, code, rate }) => (
        <Table.Row key={code} data-testid={code}>
          <Table.Cell>{currency}</Table.Cell>
          <Table.Cell>{code}</Table.Cell>
          <Table.Cell>{rate}</Table.Cell>
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
)
