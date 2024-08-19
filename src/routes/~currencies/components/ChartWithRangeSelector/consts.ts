type Range = { value: number; label: string }

export const DEFAULT_RANGE_VALUE = 30
export const RANGES: Array<Range> = [
  { value: Math.floor(365 / 2), label: '6m' },
  { value: Math.floor(365 / 4), label: '3m' },
  { value: 30, label: '1m' },
  { value: 7, label: '7d' },
]
