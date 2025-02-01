import { useEffect } from "react";
import { DashboardTabs } from "@/components/tabs";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { useFirebase } from "@/Context/Firebase";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { isLoggedIn } = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);
  
  return (
    <div className="flex min-h-screen flex-col custom-scroll-bar">
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
      {/* <UpdateTasksDefaults/> */}
    </div>
  );
}
