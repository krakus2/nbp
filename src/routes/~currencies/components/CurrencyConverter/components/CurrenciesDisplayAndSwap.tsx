import { ArrowRightLeft } from 'lucide-react'

import { Flex } from 'styled-system/jsx'

import { Text } from '~/components/ui/text'
import { IconButton } from '~/components/ui/icon-button'

interface CurrenciesDisplayAndSwap {
  isPLNtoForeign: boolean
  toggleIsPLNtoForeign: () => void
  code: string | undefined
}

export function CurrenciesDisplayAndSwap({
  isPLNtoForeign,
  code,
  toggleIsPLNtoForeign,
}: CurrenciesDisplayAndSwap) {
  return (
    <Flex align='baseline' gap='8px'>
      <Text>From {isPLNtoForeign ? 'PLN' : code}</Text>
      <IconButton
        aria-label='swap currencies'
        type='button'
        size='xs'
        onClick={toggleIsPLNtoForeign}
      >
        <ArrowRightLeft />
      </IconButton>
      <Text>To {isPLNtoForeign ? code : 'PLN'}</Text>
    </Flex>
  )
}
