import { Sidebar } from "@/components/app-sidebar";
import type React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 ml-0 lg:ml-64">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
