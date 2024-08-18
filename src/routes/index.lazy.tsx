import { createLazyFileRoute } from '@tanstack/react-router'

import { css } from '../../styled-system/css'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className={css({ fontSize: '2xl', fontWeight: 'bold' })}>
      Hello 🐼!
    </div>
  )
}
