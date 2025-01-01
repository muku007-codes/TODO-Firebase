// import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { DashboardTabs } from "@/components/tabs"
import { DateRangePicker } from "@/components/date-range-picker"
import { MainNav } from "@/components/main-nav"
import { MetricCards } from "@/components/metric-cards"
import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-tasks"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { Header } from "@/components/header"


export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            {/* <Header /> */}
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <DashboardTabs />
        <div className="space-y-4">
          {/* <MetricCards /> */}
          {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Overview />
            <RecentSales />
          </div> */}
        </div>
      </div>
    </div>
  )
}

