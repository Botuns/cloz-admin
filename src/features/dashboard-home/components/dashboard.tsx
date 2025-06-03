import { User } from "next-auth";
import { RecentActivities } from "./recent-activities";
import { StatsCards } from "./stats-cards";

type DashboardViewProps = {
  user: User;
};
export function DashboardView({ user }: DashboardViewProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground mt-2">
          Welcome back,{user?.name} Here&apos;s what&apos;s happening with Cloz.
        </p>
      </div>

      <StatsCards />

      <RecentActivities />
    </div>
  );
}
