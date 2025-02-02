import { useEffect } from "react";
import { DashboardTabs } from "@/components/tabs";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { useFirebase } from "@/Context/Firebase";
import { useNavigate } from "react-router-dom";
import { Icons } from "@/components/auth components/icons";

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
          {/* <Icons.logo className="h-8 w-8" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-command h-8 w-8"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path>
          </svg>
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
