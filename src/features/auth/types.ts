import { z } from "zod";
export enum UserRole {
  ADMIN = "ADMIN",
  VENDOR = "VENDOR",
  CUSTOMER = "CUSTOMER",
}
// create user request type
export type CreateAdminUserRequest = {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  phone?: string;
};

// schema
export const createAdminUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.nativeEnum(UserRole).optional(),
  phone: z.string().optional(),
});
