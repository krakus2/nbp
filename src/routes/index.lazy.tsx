import { createLazyFileRoute } from '@tanstack/react-router'

// import { css } from 'styled-system/css'
import { Table } from '~/parkUI/table'
import { useGetExchangeRatesTableA } from '~/services/nbp'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const { data } = useGetExchangeRatesTableA()

  return (
    // className={css({ fontSize: '2xl', fontWeight: 'bold' })}
    <div>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.Header>Currency</Table.Header>
            <Table.Header>Code</Table.Header>
            <Table.Header>Value</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data?.rates.map(({ currency, code, mid: midRate }) => (
            <Table.Row key={code}>
              <Table.Cell fontWeight='medium'>{currency}</Table.Cell>
              <Table.Cell>{code}</Table.Cell>
              <Table.Cell>{midRate}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
