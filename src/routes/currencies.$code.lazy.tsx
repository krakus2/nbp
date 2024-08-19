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
import { ArrowRightLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Flex, Stack } from 'styled-system/jsx'
import { stack } from 'styled-system/patterns'

import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { Heading } from '~/components/ui/heading'
import { CurrencyCode, useCurrencyDetails } from '~/services/nbp'
import { IconButton } from '~/components/ui/icon-button'
import { NumberInput } from '~/components/ui/number-input'
import { useCurrentAverageCurrencyExchangeRate } from '~/services/nbp/currentAverageCurrencyExchangeRate'

export const Route = createLazyFileRoute('/currencies/$code')({
  component: Currency,
})

interface ChartProps {
  data: Array<{ date: string; value: number }>
}

function Chart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width='100%' height={400}>
      <LineChart data={data}>
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

function ChartWithRangeSelector() {
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

interface CurrencyCalculatorFormValues {
  amount: number
}

const amountInputConfig = {
  required: {
    value: true,
    message: 'Amount is required field',
  },
  valueAsNumber: true,
  min: {
    value: 0,
    message: "Amount can't be less than zero",
  },
} as const

function Calculator() {
  const [isPLNtoForeign, setIsPLNtoForeign] = useState(true)
  const [convertedAmount, setConvertedAmount] = useState('')
  const { code } = Route.useParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CurrencyCalculatorFormValues>()
  const { data: currentAverageCurrencyExchangeRate } =
    useCurrentAverageCurrencyExchangeRate(code as CurrencyCode)

  const {
    min: _min,
    max: _max,
    ...amountInput
  } = register('amount', amountInputConfig)

  console.log({ currentAverageCurrencyExchangeRate })

  return (
    <Stack gap='24px'>
      <Heading size='xl'>Currency converter</Heading>
      <form
        className={stack({ gap: '24px' })}
        onSubmit={handleSubmit(({ amount }) => {
          if (!currentAverageCurrencyExchangeRate)
            throw new Error('currency exchange rate should be available')

          const convertedAmountRaw = isPLNtoForeign
            ? amount / currentAverageCurrencyExchangeRate
            : amount * currentAverageCurrencyExchangeRate

          setConvertedAmount(convertedAmountRaw.toFixed(4))
        })}
      >
        <NumberInput {...amountInput}>Amount</NumberInput>
        {errors.amount && <Text color='red'>{errors.amount.message}</Text>}
        <Flex align='baseline' gap='8px'>
          <Text>From {isPLNtoForeign ? 'PLN' : code}</Text>
          <IconButton
            aria-label='swap currencies'
            type='button'
            size='xs'
            onClick={() => setIsPLNtoForeign((state) => !state)}
          >
            <ArrowRightLeft />
          </IconButton>
          <Text>To {isPLNtoForeign ? code : 'PLN'}</Text>
        </Flex>
        <Button type='submit' disabled={!currentAverageCurrencyExchangeRate}>
          Convert
        </Button>
        <Text>Converted amount: {convertedAmount} </Text>
      </form>
    </Stack>
  )
}

function Currency() {
  return (
    <Stack>
      <ChartWithRangeSelector />
      <Calculator />
    </Stack>
  )
}
