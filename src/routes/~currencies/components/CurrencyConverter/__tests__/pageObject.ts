import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

export const clickSubmit = async () => {
  const submitButton = screen.getByText('Convert')
  await waitFor(() => expect(submitButton).not.toBeDisabled())
  await userEvent.click(submitButton)
}

export const clickSwap = async () => {
  const swapButton = screen.getByLabelText('swap currencies')
  await userEvent.click(swapButton)
}

export const typeAmountInput = async (amount: string) => {
  const amountInput = screen.getByLabelText('Amount')
  await userEvent.type(amountInput, amount)
}
