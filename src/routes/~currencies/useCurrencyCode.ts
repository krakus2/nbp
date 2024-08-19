import { useParams } from '@tanstack/react-router'

export const useCurrencyCode = () => {
  const { code } = useParams({ strict: false })

  if (!code) throw new Error('code should be defined')

  return { code }
}
