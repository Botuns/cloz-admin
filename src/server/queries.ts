// Complete Prisma queries for e-commerce application
import { OrderStatus, UserRole } from "@/generated/prisma";
import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/prisma";

// ==================== ORDER QUERIES ====================

export async function getAllOrders() {
  return await prisma.order.findMany({
    include: {
      customer: true,
      items: {
        include: {
          product: {
            include: {
              brand: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Get orders by status
export async function getOrdersByStatus(status: OrderStatus) {
  return await prisma.order.findMany({
    where: {
      status,
    },
    include: {
      customer: true,
      items: {
        include: {
          product: {
            include: {
              brand: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Get order by ID
export async function getOrderById(orderId: string) {
  return await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      customer: true,
      items: {
        include: {
          product: {
            include: {
              brand: true,
              category: true,
            },
          },
        },
      },
    },
  });
}

// Get orders by customer ID
export async function getOrdersByCustomerId(customerId: string) {
  return await prisma.order.findMany({
    where: {
      customerId,
    },
    include: {
      customer: true,
      items: {
        include: {
          product: {
            include: {
              brand: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Get total orders count
export async function getTotalOrdersCount() {
  return await prisma.order.count();
}

// Get vendor orders (CORRECTED - use proper relation through items)
export async function getVendorOrders(brandId: string) {
  return await prisma.order.findMany({
    where: {
      items: {
        some: {
          product: {
            brandId,
          },
        },
      },
    },
    include: {
      customer: true,
      items: {
        include: {
          product: {
            include: {
              brand: true,
            },
          },
        },
        where: {
          product: {
            brandId,
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Create new order
export async function createOrder(orderData: Prisma.OrderCreateInput) {
  return await prisma.order.create({
    data: orderData,
    include: {
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

// Update order status
export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  return await prisma.order.update({
    where: { id: orderId },
    data: { status },
    include: {
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

// Get orders by date range
export async function getOrdersByDateRange(startDate: Date, endDate: Date) {
  return await prisma.order.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      customer: true,
      items: {
        include: {
          product: {
            include: {
              brand: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// ==================== USER QUERIES ====================

// Get all users
export async function getAllUsers() {
  return await prisma.user.findMany({
    include: {
      profile: true,
      orders: {
        include: {
          items: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Get user by ID
export async function getUserById(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
      orders: {
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      },
      reviews: {
        include: {
          product: true,
        },
      },
    },
  });
}

// Get user by email
export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
    include: {
      profile: true,
    },
  });
}

// Create new user
export async function createUser(userData: Prisma.UserCreateInput) {
  return await prisma.user.create({
    data: userData,
    include: {
      profile: true,
    },
  });
}

// Update user
export async function updateUser(
  userId: string,
  userData: Prisma.UserUpdateInput
) {
  return await prisma.user.update({
    where: { id: userId },
    data: userData,
    include: {
      profile: true,
    },
  });
}

// Get users by role
export async function getUsersByRole(role: UserRole) {
  return await prisma.user.findMany({
    where: { role },
    include: {
      profile: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// ==================== PRODUCT QUERIES ====================

// Get all products
export async function getAllProducts() {
  return await prisma.product.findMany({
    include: {
      brand: true,
      category: true,
      variants: true,
      reviews: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Get product by ID
export async function getProductById(productId: string) {
  return await prisma.product.findUnique({
    where: { id: productId },
    include: {
      brand: true,
      category: true,
      variants: true,
      reviews: {
        include: {
          user: {
            select: {
              name: true,
              avatar: true,
            },
          },
        },
        where: {
          isApproved: true,
        },
      },
    },
  });
}

// Get product by slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findUnique({
    where: { slug },
    include: {
      brand: true,
      category: true,
      variants: true,
      reviews: {
        include: {
          user: {
            select: {
              name: true,
              avatar: true,
            },
          },
        },
        where: {
          isApproved: true,
        },
      },
    },
  });
}

// Get products by brand
export async function getProductsByBrand(brandId: string) {
  return await prisma.product.findMany({
    where: { brandId },
    include: {
      brand: true,
      category: true,
      variants: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Get products by category
export async function getProductsByCategory(categoryId: string) {
  return await prisma.product.findMany({
    where: { categoryId },
    include: {
      brand: true,
      category: true,
      variants: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Get featured products
export async function getFeaturedProducts() {
  return await prisma.product.findMany({
    where: {
      isFeatured: true,
      isActive: true,
    },
    include: {
      brand: true,
      category: true,
      variants: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Search products
export async function searchProducts(query: string) {
  return await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          tags: {
            has: query,
          },
        },
      ],
      isActive: true,
    },
    include: {
      brand: true,
      category: true,
      variants: true,
    },
  });
}

// Create product
export async function createProduct(productData: Prisma.ProductCreateInput) {
  return await prisma.product.create({
    data: productData,
    include: {
      brand: true,
      category: true,
      variants: true,
    },
  });
}

// Update product
export async function updateProduct(
  productId: string,
  productData: Prisma.ProductUpdateInput
) {
  return await prisma.product.update({
    where: { id: productId },
    data: productData,
    include: {
      brand: true,
      category: true,
      variants: true,
    },
  });
}

// Delete product
export async function deleteProduct(productId: string) {
  return await prisma.product.delete({
    where: { id: productId },
  });
}

// ==================== BRAND QUERIES ====================

// Get all brands
export async function getAllBrands() {
  return await prisma.brand.findMany({
    include: {
      products: {
        select: {
          id: true,
          name: true,
          isActive: true,
        },
      },
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
}

// Get brand by ID
export async function getBrandById(brandId: string) {
  return await prisma.brand.findUnique({
    where: { id: brandId },
    include: {
      products: {
        include: {
          category: true,
          variants: true,
        },
      },
    },
  });
}

// Get brand by slug
export async function getBrandBySlug(slug: string) {
  return await prisma.brand.findUnique({
    where: { slug },
    include: {
      products: {
        where: {
          isActive: true,
        },
        include: {
          category: true,
          variants: true,
        },
      },
    },
  });
}

// Get featured brands
export async function getFeaturedBrands() {
  return await prisma.brand.findMany({
    where: {
      isFeatured: true,
      isActive: true,
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
}

// Create brand
export async function createBrand(brandData: Prisma.BrandCreateInput) {
  return await prisma.brand.create({
    data: brandData,
  });
}

// Update brand
export async function updateBrand(
  brandId: string,
  brandData: Prisma.BrandUpdateInput
) {
  return await prisma.brand.update({
    where: { id: brandId },
    data: brandData,
  });
}

// ==================== CATEGORY QUERIES ====================

// Get all categories
export async function getAllCategories() {
  return await prisma.category.findMany({
    include: {
      parent: true,
      children: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: {
      sortOrder: "asc",
    },
  });
}

// Get category by ID
export async function getCategoryById(categoryId: string) {
  return await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      parent: true,
      children: true,
      products: {
        include: {
          brand: true,
          variants: true,
        },
      },
    },
  });
}

// Get category by slug
export async function getCategoryBySlug(slug: string) {
  return await prisma.category.findUnique({
    where: { slug },
    include: {
      parent: true,
      children: true,
      products: {
        where: {
          isActive: true,
        },
        include: {
          brand: true,
          variants: true,
        },
      },
    },
  });
}

// Get root categories (no parent)
export async function getRootCategories() {
  return await prisma.category.findMany({
    where: {
      parentId: null,
    },
    include: {
      children: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: {
      sortOrder: "asc",
    },
  });
}

// Create category
export async function createCategory(categoryData: Prisma.CategoryCreateInput) {
  return await prisma.category.create({
    data: categoryData,
    include: {
      parent: true,
      children: true,
    },
  });
}

// ==================== REVIEW QUERIES ====================

// Get all reviews
export async function getAllReviews() {
  return await prisma.review.findMany({
    include: {
      user: {
        select: {
          name: true,
          avatar: true,
          email: true,
        },
      },
      product: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Get reviews by product
export async function getReviewsByProduct(productId: string) {
  return await prisma.review.findMany({
    where: {
      productId,
      isApproved: true,
    },
    include: {
      user: {
        select: {
          name: true,
          avatar: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Get reviews by user
export async function getReviewsByUser(userId: string) {
  return await prisma.review.findMany({
    where: { userId },
    include: {
      product: {
        select: {
          name: true,
          slug: true,
          images: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Create review
export async function createReview(reviewData: Prisma.ReviewCreateInput) {
  return await prisma.review.create({
    data: reviewData,
    include: {
      user: {
        select: {
          name: true,
          avatar: true,
        },
      },
      product: {
        select: {
          name: true,
        },
      },
    },
  });
}

// ==================== ANALYTICS QUERIES ====================

// Get dashboard stats
export async function getDashboardStats() {
  const [totalOrders, totalProducts, totalUsers, totalBrands] =
    await Promise.all([
      prisma.order.count(),
      prisma.product.count(),
      prisma.user.count(),
      prisma.brand.count(),
    ]);

  const totalRevenue = await prisma.order.aggregate({
    _sum: {
      totalAmount: true,
    },
    where: {
      isPaid: true,
    },
  });

  return {
    totalOrders,
    totalProducts,
    totalUsers,
    totalBrands,
    totalRevenue: totalRevenue._sum.totalAmount || 0,
  };
}

// Get sales by date range
export async function getSalesByDateRange(startDate: Date, endDate: Date) {
  return await prisma.order.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
      isPaid: true,
    },
    select: {
      totalAmount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

// Get top selling products
export async function getTopSellingProducts(limit: number = 10) {
  return await prisma.product.findMany({
    where: {
      totalOrders: {
        gt: 0,
      },
    },
    include: {
      brand: true,
      category: true,
    },
    orderBy: {
      totalOrders: "desc",
    },
    take: limit,
  });
}

// Get recent orders
export async function getRecentOrders(limit: number = 10) {
  return await prisma.order.findMany({
    include: {
      customer: {
        select: {
          name: true,
          email: true,
        },
      },
      items: {
        include: {
          product: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });
}

// ==================== CAMPAIGN & BANNER QUERIES ====================

// Get active campaigns
export async function getActiveCampaigns() {
  return await prisma.campaign.findMany({
    where: {
      isActive: true,
      startDate: {
        lte: new Date(),
      },
      OR: [
        {
          endDate: null,
        },
        {
          endDate: {
            gte: new Date(),
          },
        },
      ],
    },
    orderBy: {
      startDate: "desc",
    },
  });
}

// Get active banners
export async function getActiveBanners(position?: string) {
  return await prisma.banner.findMany({
    where: {
      isActive: true,
      ...(position && { position }),
      OR: [
        {
          startDate: null,
        },
        {
          startDate: {
            lte: new Date(),
          },
        },
      ],
      AND: [
        {
          OR: [
            {
              endDate: null,
            },
            {
              endDate: {
                gte: new Date(),
              },
            },
          ],
        },
      ],
    },
    orderBy: {
      sortOrder: "asc",
    },
  });
}

// ==================== UTILITY QUERIES ====================

// Get order with payment info
export async function getOrderWithPayment(orderId: string) {
  return await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      customer: true,
      items: {
        include: {
          product: {
            include: {
              brand: true,
            },
          },
        },
      },
    },
  });
}

// Update product inventory
export async function updateProductInventory(
  productId: string,
  quantity: number
) {
  return await prisma.product.update({
    where: { id: productId },
    data: {
      inventory: {
        decrement: quantity,
      },
    },
  });
}

// Get low stock products
export async function getLowStockProducts(threshold: number = 10) {
  return await prisma.product.findMany({
    where: {
      inventory: {
        lte: threshold,
      },
      isActive: true,
    },
    include: {
      brand: true,
      category: true,
    },
    orderBy: {
      inventory: "asc",
    },
  });
}
