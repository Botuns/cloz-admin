import prisma from "@/lib/prisma";
import { ServerFunctionBaseResponse } from "@/server-functions-base-response";
import { CreateBrandRequest } from "../types";

export async function createBrandAction(
  payload: CreateBrandRequest
): Promise<ServerFunctionBaseResponse> {
  try {
    const normalizedSlug = payload.slug
      .toString()
      .trim()
      .toLowerCase()
      .normalize("NFKD")
      .replace(/\p{Diacritic}+/gu, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    // Ensure uniqueness by slug and name
    const [existingBySlug, existingByName] = await Promise.all([
      prisma.brand.findUnique({ where: { slug: normalizedSlug } }),
      prisma.brand.findUnique({ where: { name: payload.name } }),
    ]);

    if (existingBySlug) {
      return {
        success: false,
        status: 400,
        error: "A brand with this slug already exists",
      };
    }

    if (existingByName) {
      return {
        success: false,
        status: 400,
        error: "A brand with this name already exists",
      };
    }

    const brand = await prisma.brand.create({
      data: {
        name: payload.name,
        slug: normalizedSlug,
        description: payload.description || null,
        logo: payload.logo || null,
        banner: payload.banner || null,
        contactEmail: payload.contactEmail,
        contactPhone: payload.contactPhone || null,
        website: payload.website || null,
        isActive: payload.isActive ?? true,
        isFeatured: payload.isFeatured ?? false,
        isVerified: payload.isVerified ?? false,
        allowPOD: payload.allowPOD ?? true,
        commission:
          typeof payload.commission === "number"
            ? payload.commission
            : undefined,
      },
    });

    return {
      success: true,
      status: 201,
      message: "Brand created successfully",
      data: brand,
    };
  } catch (err: unknown) {
    // Narrow known Prisma unique constraint error
    const error = err as { code?: string; message?: string };
    if (error?.code === "P2002") {
      return {
        success: false,
        status: 400,
        error: "Brand already exists with the provided unique field",
      };
    }

    console.error("createBrandAction error:", err);
    return {
      success: false,
      status: 500,
      error: "Failed to create brand",
      message: error?.message || "Internal server error",
    };
  }
}
