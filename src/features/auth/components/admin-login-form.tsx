"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: SignInFormValues) {
    setIsLoading(true);

    // Call next-auth’s credentials provider
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    setIsLoading(false);

    if (result?.error) {
      // NextAuth will return error === "CredentialsSignin" on wrong credentials
      if (result.error === "CredentialsSignin") {
        toast.error("Email or password is incorrect.");
      } else {
        toast.error(`Login error: ${result.error}`);
      }
    } else {
      toast.success("Logged in successfully!");
      // Redirect to your protected page (dashboard)
      router.push("/dashboard");
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-10 shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Sign In</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      autoComplete="email"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      autoComplete="current-password"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-b from-stone-700 to-stone-900 shadow-lg hover:from-stone-800 hover:to-stone-950 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin" />
                    <span className="ml-2">Signing in...</span>
                  </div>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="text-center items-center justify-center text-xs">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-blue-500 hover:underline text-xs"
        >
          Sign up here
        </Link>
      </CardFooter>
    </Card>
  );
}
