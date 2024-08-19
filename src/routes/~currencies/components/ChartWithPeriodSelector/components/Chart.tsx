import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type ChartProps = {
  data: Array<{ date: string; value: number }>
}

export const Chart = ({ data }: ChartProps) => (
  <ResponsiveContainer width='100%' height={400}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='date' />
      <YAxis domain={['dataMin', 'dataMax']} />
      <Tooltip />
      <Line type='monotone' dataKey='value' stroke='#8884d8' />
    </LineChart>
  </ResponsiveContainer>
)
