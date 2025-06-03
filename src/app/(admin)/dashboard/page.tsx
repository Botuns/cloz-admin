// app/dashboard/page.tsx
import { getServerSession, type DefaultUser } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardView } from "@/features/dashboard-home/components/dashboard";

export default async function DashboardPage() {
  // 1) Fetch the session on the server
  const session = await getServerSession(authOptions);

  // 2) If no session, send them back to /auth/login (or wherever)
  if (!session || !session.user) {
    redirect("/auth/login");
  }

  // 3) Now `session.user` is an object containing at least:
  //    { name?: string; email?: string; image?: string; [any custom fields] }
  //    Plus any fields you added via callbacks (e.g. role, id, etc).
  const { user } = session;

  return <DashboardView user={user as DefaultUser} />;
}
