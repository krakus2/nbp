import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Flex, Stack } from 'styled-system/jsx'
import { Button } from '~/components/ui/button'

import { Heading } from '~/components/ui/heading'
import { CurrencyCode, useCurrencyDetails } from '~/services/nbp'

export const Route = createLazyFileRoute('/currencies/$code')({
  component: Currency,
})

interface ChartProps {
  data: Array<{ date: string; value: number }>
}

const Chart = ({ data }: ChartProps) => {
  // Transform the data to match the recharts format
  const chartData = data.map(({ date, value }) => ({ date, value }))

  return (
    <ResponsiveContainer width='100%' height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Line type='monotone' dataKey='value' stroke='#8884d8' />
      </LineChart>
    </ResponsiveContainer>
  )
}

type Range = { value: number; label: string }
const DEFAULT_RANGE_VALUE = 30
const RANGES: Array<Range> = [
  { value: Math.floor(365 / 2), label: '6m' },
  { value: Math.floor(365 / 4), label: '3m' },
  { value: 30, label: '1m' },
  { value: 7, label: '7d' },
]

function Currency() {
  const [range, setRange] = useState(DEFAULT_RANGE_VALUE)
  const { code } = Route.useParams()
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
    <div>
      {/* INFO: It's a mix of english and polish here - in real app scenario it should be aligned */}
      <Heading as='h1'>Currency Details for {data?.currency}</Heading>
      <Stack>
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
    </div>
  )
}
