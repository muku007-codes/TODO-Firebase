import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Clock, Plus, RefreshCw } from 'lucide-react'

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

export function MetricCards() {
  return (
    // <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    //   <Card>
    //     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //       <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
    //       <DollarSign className="h-4 w-4 text-muted-foreground" />
    //     </CardHeader>
    //     <CardContent>
    //       <div className="text-2xl font-bold">$45,231.89</div>
    //       <p className="text-xs text-muted-foreground">
    //         +20.1% from last month
    //       </p>
    //     </CardContent>
    //   </Card>
    //   <Card>
    //     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //       <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
    //       <Users className="h-4 w-4 text-muted-foreground" />
    //     </CardHeader>
    //     <CardContent>
    //       <div className="text-2xl font-bold">+2350</div>
    //       <p className="text-xs text-muted-foreground">
    //         +180.1% from last month
    //       </p>
    //     </CardContent>
    //   </Card>
    //   <Card>
    //     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //       <CardTitle className="text-sm font-medium">Sales</CardTitle>
    //       <CreditCard className="h-4 w-4 text-muted-foreground" />
    //     </CardHeader>
    //     <CardContent>
    //       <div className="text-2xl font-bold">+12,234</div>
    //       <p className="text-xs text-muted-foreground">
    //         +19% from last month
    //       </p>
    //     </CardContent>
    //   </Card>
    //   <Card>
    //     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //       <CardTitle className="text-sm font-medium">Active Now</CardTitle>
    //       <Activity className="h-4 w-4 text-muted-foreground" />
    //     </CardHeader>
    //     <CardContent>
    //       <div className="text-2xl font-bold">+573</div>
    //       <p className="text-xs text-muted-foreground">
    //         +201 since last hour
    //       </p>
    //     </CardContent>
    //   </Card>
    // </div>

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

