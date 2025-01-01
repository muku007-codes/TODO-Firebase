import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "Done", value: 54, color: "#10B981" },
  { name: "In Progress", value: 6, color: "#3B82F6" },
  { name: "To Do", value: 3, color: "#6B7280" },
]

export function StatusOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <div className="h-[200px] w-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="ml-4">
            <div className="space-y-2">
              {data.map((item) => (
                <div key={item.name} className="flex items-center">
                  <div className="h-3 w-3 rounded-sm mr-2" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">
                    {item.name} ({item.value})
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm">Create status</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

