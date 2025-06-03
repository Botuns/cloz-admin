// app/auth/login/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import LoginForm from "@/features/auth/components/admin-login-form";

export default async function SignInPage() {
  // 1) On the server, check if there's already a session.
  const session = await getServerSession(authOptions);

  if (session) {
    // If you’re already signed in, send them to the dashboard (or “/”).
    redirect("/dashboard");
  }

  // 2) If not signed in, render the client‐side form.
  return <LoginForm />;
}
