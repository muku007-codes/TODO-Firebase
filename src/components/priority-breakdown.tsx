"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { priority: "Highest", value: 0 },
  { priority: "High", value: 0 },
  { priority: "Medium", value: 8 },
  { priority: "Low", value: 0 },
  { priority: "Lowest", value: 0 },
]

export function PriorityBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Priority breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="priority" />
              <YAxis />
              <Bar
                dataKey="value"
                fill="#F59E0B"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

