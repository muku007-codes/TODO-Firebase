"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MetricCards } from "./metric-cards";
import { Overview } from "./overview";
import { RecentActivity } from "./recent-tasks";
import { JiraTodo } from "./jira-todo";
import StopWatchContainer from "./StopWatchContainer";
import { HabitTracker } from "./HabitTracker";

export function DashboardTabs() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview" className="relative">
          Overview
        </TabsTrigger>
        <TabsTrigger value="Habits">Habits</TabsTrigger>
        <TabsTrigger value="Stopwatch">Stopwatch</TabsTrigger>
        <TabsTrigger value="Board">Board</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <MetricCards />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <RecentActivity />
          <Overview />
        </div>
      </TabsContent>
      <TabsContent value="Habits" className="space-y-4">
        {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border p-6">Habits content</div>
        </div> */}
          <HabitTracker />
      </TabsContent>
      <TabsContent value="Stopwatch" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* <div className="rounded-xl border p-6">Stopwatch content</div> */}
          <StopWatchContainer />
        </div>
      </TabsContent>
      <TabsContent value="Board" className="space-y-4">
        <div className="">
          <JiraTodo />
        </div>
      </TabsContent>
    </Tabs>
  );
}
