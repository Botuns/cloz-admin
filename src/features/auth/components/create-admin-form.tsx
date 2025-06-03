"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createAdminUserSchema, UserRole } from "../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateAdmin } from "../api/use-create-admin";
import Link from "next/link";
import { Loader2 } from "lucide-react";

type FormValues = z.infer<typeof createAdminUserSchema>;

export const CreateAdminForm = () => {
  const { mutate, isPending } = useCreateAdmin();
  const form = useForm<FormValues>({
    resolver: zodResolver(createAdminUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: UserRole.ADMIN,
      phone: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate({
      json: data,
    });
  };

  const availableRoles = Object.values(UserRole).map((role) => ({
    value: role,
    label: role.charAt(0).toUpperCase() + role.slice(1).toLowerCase(),
  }));

  return (
    <Card className="w-full max-w-md mx-auto p-4 py-8">
      {/* <CardHeader>
        <CardTitle className="text-center">Create Admin Account</CardTitle>
        <CardDescription className="text-center">
          Add a new administrator to cloz
        </CardDescription>
      </CardHeader> */}
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="admin@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || UserRole.ADMIN}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableRoles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Default is Admin role</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-b from-stone-700 to-stone-900 shadow-lg hover:from-stone-800 hover:to-stone-950 text-white"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin" />
                    <span className="ml-2">Creating Admin...</span>
                  </div>
                </>
              ) : (
                "Create Admin"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col justify-center text-sm text-muted-foreground">
        Admin accounts have full system access
        <p className="text-xs">
          Have an existing account?{" "}
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Sign in here
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default CreateAdminForm;
