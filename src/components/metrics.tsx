import { Check, Clock, Plus, RefreshCw } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

const metrics = [
  {
    title: "27 done",
    description: "in the last 7 days",
    icon: Check,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "36 updated",
    description: "in the last 7 days",
    icon: RefreshCw,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "29 created",
    description: "in the last 7 days",
    icon: Plus,
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "0 due",
    description: "in the next 7 days",
    icon: Clock,
    color: "bg-gray-100 text-gray-700",
  },
]

export function Metrics() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className={`rounded-full p-2 ${metric.color}`}>
              <metric.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold">{metric.title}</div>
              <div className="text-sm text-muted-foreground">{metric.description}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

