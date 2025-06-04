// Create Brand request type
export type CreateBrandRequest = {
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  banner?: string;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  isVerified?: boolean;
  allowPOD?: boolean;
  commission?: number;
};

// Update Brand request type
export type UpdateBrandRequest = Partial<CreateBrandRequest>;

import { z } from "zod";

export const createBrandSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  logo: z.string().optional(),
  banner: z.string().optional(),
  contactEmail: z.string().email("Invalid contact email"),
  contactPhone: z.string().optional(),
  website: z.string().url("Invalid website URL").optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  allowPOD: z.boolean().optional(),
  commission: z
    .number()
    .min(0, "Commission must be a positive number")
    .optional(),
});

export const updateBrandSchema = createBrandSchema.partial();
