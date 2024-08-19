import { Stack } from 'styled-system/jsx'
import { stack } from 'styled-system/patterns'

import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { Heading } from '~/components/ui/heading'
import { NumberInput } from '~/components/ui/number-input'

import { useForm } from './useForm'
import { CurrenciesDisplayAndSwap } from './components'

export const CurrencyConverter = () => {
  const {
    onSubmit,
    errors,
    code,
    amountInputRegistered,
    convertedAmount,
    isPLNtoForeign,
    toggleIsPLNtoForeign,
    isSubmitButtonDisabled,
  } = useForm()

  return (
    <Stack gap='24px'>
      <Heading size='xl'>Currency converter</Heading>
      <form className={stack({ gap: '24px' })} onSubmit={onSubmit}>
        <NumberInput {...amountInputRegistered}>Amount</NumberInput>
        {errors.amount && <Text color='red'>{errors.amount.message}</Text>}
        <CurrenciesDisplayAndSwap
          isPLNtoForeign={isPLNtoForeign}
          toggleIsPLNtoForeign={toggleIsPLNtoForeign}
          code={code}
        />
        <Button type='submit' disabled={isSubmitButtonDisabled}>
          Convert
        </Button>
        <Text>Converted amount: {convertedAmount} </Text>
      </form>
    </Stack>
  )
}
