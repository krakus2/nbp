type Period = { value: number; label: string }

export const DEFAULT_PERIOD_VALUE = 30
export const PERIODS: Array<Period> = [
  { value: Math.floor(365 / 2), label: '6m' },
  { value: Math.floor(365 / 4), label: '3m' },
  { value: 30, label: '1m' },
  { value: 7, label: '7d' },
]
