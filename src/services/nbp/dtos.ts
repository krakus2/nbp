export type CurrencyDetailsDTO = {
  table: string
  currency: string
  code: string
  rates: Array<{ no: string; effectiveDate: string; mid: number }>
}
