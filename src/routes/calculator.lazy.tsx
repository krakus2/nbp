import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/calculator')({
  component: About,
})

function About() {
  return <div className='p-2'>Hello from calculator</div>
}
