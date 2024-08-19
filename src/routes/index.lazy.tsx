import { createLazyFileRoute } from '@tanstack/react-router'

import { stack } from 'styled-system/patterns'
import { Table } from '~/parkUI/table'
import { Button } from '~/parkUI/button'
import { useGetExchangeRatesTableA } from '~/services/nbp'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const { data } = useGetExchangeRatesTableA()

  if (!data) return null

  return (
    <div>
      <div className={stack({ maxWidth: '800px', margin: '0 auto' })}>
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
                  <Button
                    size='xs'
                    onClick={() => {
                      console.log('details')
                    }}
                  >
                    Details
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  )
}
