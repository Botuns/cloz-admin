import { CreateAdminUserRequest } from "@/features/auth/types";
import { ServerFunctionBaseResponse } from "@/server-functions-base-response";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";

// using prisma, i want to create server actions for creating user
export async function createAdminUserAction(
  payload: CreateAdminUserRequest
): Promise<ServerFunctionBaseResponse> {
  // destructure payload
  const { email, password, name, role, phone } = payload;
  // check existence
  try {
    const existingAdmin = await prisma.user.findUnique({
      where: { email },
    });
    if (existingAdmin) {
      return {
        success: false,
        error: "User already exists",
        status: 400,
      };
    }
    // create user
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin
    const admin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "ADMIN",
        phone: phone || null,
        isActive: true,
      },
    });
    if (!admin) {
      return {
        success: false,
        error: "Failed to create user",
        status: 500,
      };
    }
    return {
      data: admin,
      success: true,
      status: 201,
      message: "User created successfully",
    };
  } catch (error: unknown) {
    console.error(error);
    return {
      error: "Error creating user",
      status: 500,
      success: false,
      message: "Internal server error",
    };
  }
}
