import { useParams } from '@tanstack/react-router'
import { useState } from 'react'

import { SubmitHandler, useForm as useReactHookForm } from 'react-hook-form'

import { CurrencyCode } from '~/services/nbp'
import { useCurrentAverageCurrencyExchangeRate } from '~/services/nbp/currentAverageCurrencyExchangeRate'

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

export function useForm() {
  const [isPLNtoForeign, setIsPLNtoForeign] = useState(true)
  const [convertedAmount, setConvertedAmount] = useState('')
  const { code } = useParams({ strict: false })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useReactHookForm<CurrencyCalculatorFormValues>()
  const { data: currentAverageCurrencyExchangeRate } =
    useCurrentAverageCurrencyExchangeRate(code as CurrencyCode)

  const {
    min: _min,
    max: _max,
    ...amountInput
  } = register('amount', amountInputConfig)

  const onValid: SubmitHandler<CurrencyCalculatorFormValues> = ({ amount }) => {
    if (!currentAverageCurrencyExchangeRate)
      throw new Error('currency exchange rate should be available')

    const convertedAmountRaw = isPLNtoForeign
      ? amount / currentAverageCurrencyExchangeRate
      : amount * currentAverageCurrencyExchangeRate

    setConvertedAmount(convertedAmountRaw.toFixed(4))
  }

  const toggleIsPLNtoForeign = () => setIsPLNtoForeign((value) => !value)
  const isSubmitButtonDisabled = !currentAverageCurrencyExchangeRate

  return {
    onSubmit: (event?: React.BaseSyntheticEvent) =>
      handleSubmit(onValid)(event),
    errors,
    code,
    amountInput,
    convertedAmount,
    isPLNtoForeign,
    toggleIsPLNtoForeign,
    isSubmitButtonDisabled,
  }
}
