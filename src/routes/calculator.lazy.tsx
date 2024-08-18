import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/calculator')({
  component: Calculator,
})

function Calculator() {
  return <div className='p-2'>Hello from calculator</div>
}
