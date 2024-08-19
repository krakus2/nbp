import { useParams } from '@tanstack/react-router'
import { useState } from 'react'

import { Flex, Stack } from 'styled-system/jsx'

import { Button } from '~/components/ui/button'
import { Heading } from '~/components/ui/heading'
import { CurrencyCode, useCurrencyDetails } from '~/services/nbp'

import { Chart } from './components'
import { DEFAULT_RANGE_VALUE, RANGES } from './consts'

export function ChartWithRangeSelector() {
  const [range, setRange] = useState(DEFAULT_RANGE_VALUE)
  const { code } = useParams({ strict: false })
  const { data, isPending } = useCurrencyDetails({
    code: code as CurrencyCode,
    range,
  })

  const chartData = data
    ? data.rates.map(({ mid, effectiveDate }) => ({
        date: effectiveDate,
        value: mid,
      }))
    : []

  return (
    <Stack>
      <Heading size='xl'>{data?.code} to PLN chart</Heading>
      <Chart data={chartData} />
      <Flex gap='8px' alignSelf='center'>
        {RANGES.map(({ value, label }) => {
          const isRangeSelected = value === range

          return (
            <Button
              onClick={() => setRange(value)}
              loading={isRangeSelected && isPending}
              variant={isRangeSelected ? 'outline' : 'solid'}
            >
              {label}
            </Button>
          )
        })}
      </Flex>
    </Stack>
  )
}
