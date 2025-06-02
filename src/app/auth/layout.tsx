import React, { ReactNode } from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Container from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Authentication - Cloz Admin",
  description: "Authentication page for Cloz Admin dashboard",
};

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/50">
      <Container size="lg" className="px-4 py-8">
        {/* Logo */}
        <div className="flex justify-center mb-0">
          <div className="flex items-center">
            <div className="bg-primary w-6 h-6 rounded mr-2"></div>
            <h1 className="text-2xl font-bold text-foreground">Cloz Admin</h1>
          </div>
        </div>

        {/* Auth Card using shadcn UI Card component */}
        <Card className="shadow-none bg-transparent border-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center">
              Please enter your credentials to access the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Auth Form Container */}
            {children}
          </CardContent>
        </Card>
      </Container>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-muted-foreground pb-6">
        <p>© {new Date().getFullYear()} Cloz. All rights reserved.</p>
        <p className="mt-1">
          For support, contact{" "}
          <Link
            href="mailto:admin@cloz.com"
            className="text-primary hover:text-primary/80 underline-offset-4 hover:underline"
          >
            admin@cloz.com
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
