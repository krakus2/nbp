import { useState } from 'react'

import { Flex, Stack } from 'styled-system/jsx'

import { Button } from '~/components/ui/button'
import { Heading } from '~/components/ui/heading'
import { useCurrencyDetailsQuery } from '~/services/nbp'

import { useCurrencyCode } from '../../useCurrencyCode'

import { CurrencyChart } from './components'
import { DEFAULT_PERIOD_VALUE, PERIODS } from './consts'

export const CurrencyChartChartWithPeriodSelector = () => {
  const [period, setPeriod] = useState(DEFAULT_PERIOD_VALUE)
  const { code } = useCurrencyCode()
  const { data, isPending } = useCurrencyDetailsQuery({
    code,
    period,
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
      <CurrencyChart data={chartData} />
      <Flex gap='8px' alignSelf='center'>
        {PERIODS.map(({ value, label }) => {
          const isPeriodSelected = value === period

          return (
            <Button
              key={value}
              onClick={() => setPeriod(value)}
              loading={isPeriodSelected && isPending}
              variant={isPeriodSelected ? 'outline' : 'solid'}
            >
              {label}
            </Button>
          )
        })}
      </Flex>
    </Stack>
  )
}
