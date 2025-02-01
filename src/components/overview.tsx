import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 4800,
  },
  {
    name: "Feb",
    total: 1400,
  },
  {
    name: "Mar",
    total: 2000,
  },
  {
    name: "Apr",
    total: 1500,
  },
  {
    name: "May",
    total: 3200,
  },
  {
    name: "Jun",
    total: 3300,
  },
  {
    name: "Jul",
    total: 2100,
  },
  {
    name: "Aug",
    total: 4900,
  },
  {
    name: "Sep",
    total: 3100,
  },
  {
    name: "Oct",
    total: 3000,
  },
  {
    name: "Nov",
    total: 4500,
  },
  {
    name: "Dec",
    total: 1300,
  },
]

export function Overview() {
  return (
    <div className="col-span-3">
      <div className="rounded-xl border bg-card">
        <div className="p-6">
          <h3 className="text-lg font-medium">Overview</h3>
        </div>
        <div className="p-6 pt-0">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Bar
                dataKey="total"
                fill="#18181B"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

