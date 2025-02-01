import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const activities = [
  {
    user: "Jasbir Singh",
    action: "changed the status to Done on",
    item: "ST-82 - Improve doc with ai and also check on the youtube url to doc",
    time: "2 days ago",
  },
  {
    user: "Jasbir Singh",
    action: "changed the status to Done on",
    item: "ST-86 - Improve text to doc, fix youtube to doc and web url to doc features",
    time: "2 days ago",
  },
  {
    user: "Jasbir Singh",
    action: "changed the status to Done on",
    item: "ST-85 - Add a toast message when a user has fewer credits",
    time: "2 days ago",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span>{" "}
                  {activity.action}{" "}
                  <span className="font-medium">{activity.item}</span>
                </p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

