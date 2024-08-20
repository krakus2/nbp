import { useState } from 'react'
import { SubmitHandler, useForm as useReactHookForm } from 'react-hook-form'

import { useCurrentAverageCurrencyExchangeRate } from '~/services/nbp'

import { useCurrencyCode } from '../../useCurrencyCode'

type CurrencyCalculatorFormValues = {
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

export const useForm = () => {
  const [isPLNtoForeign, setIsPLNtoForeign] = useState(true)
  const [convertedAmount, setConvertedAmount] = useState('')
  const { code } = useCurrencyCode()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useReactHookForm<CurrencyCalculatorFormValues>()
  const { data: currentAverageCurrencyExchangeRate } =
    useCurrentAverageCurrencyExchangeRate(code)

  console.log({ currentAverageCurrencyExchangeRate, isPLNtoForeign, code })

  const {
    // INFO: There were type inconsistencies, so instead of using controller I just omitted them as there are not needed
    min: _min,
    max: _max,
    ...amountInputRegistered
  } = register('amount', amountInputConfig)

  const onValid: SubmitHandler<CurrencyCalculatorFormValues> = ({ amount }) => {
    console.log('SUBMIT', { currentAverageCurrencyExchangeRate, amount })
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
    amountInputRegistered,
    convertedAmount,
    isPLNtoForeign,
    toggleIsPLNtoForeign,
    isSubmitButtonDisabled,
  }
}
