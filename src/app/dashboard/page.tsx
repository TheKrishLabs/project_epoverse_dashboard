import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DashboardStats } from "@/components/dashboard-stats";

export default function DashboardPage() {
    return (
      <div className="flex flex-col gap-8">
        <DashboardStats />
        <div className="z-10 w-full flex flex-col gap-8">
                <ChartAreaInteractive />
              </div>
      </div>
    )
  }
