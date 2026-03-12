import type { Role } from "@prisma/client";
import prisma from "@/lib/prisma";
import { PAGINATION_DEFAULTS } from "@/lib/constants";
import type { PaginationInput } from "@/lib/validators";

export async function createUser(data: {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: Role;
}) {
  return prisma.user.create({
    data: {
      ...data,
      email: data.email.toLowerCase(),
    },
  });
}

export async function updateUser(
  userId: string,
  data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    profileImage?: string;
  }
) {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
}

export async function deleteUser(userId: string) {
  return prisma.user.delete({ where: { id: userId } });
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: { student: true, teacher: true, management: true },
  });
}

type UserFilters = {
  role?: Role;
  search?: string;
  isActive?: boolean;
};

export async function findAllUsers(
  filters: UserFilters,
  pagination: PaginationInput
) {
  const { page = PAGINATION_DEFAULTS.PAGE, limit = PAGINATION_DEFAULTS.LIMIT } = pagination;
  const skip = (page - 1) * limit;
  const where: Record<string, unknown> = {};
  if (filters.role) where.role = filters.role;
  if (filters.isActive !== undefined) where.isActive = filters.isActive;
  if (filters.search) {
    where.OR = [
      { email: { contains: filters.search, mode: "insensitive" } },
      { firstName: { contains: filters.search, mode: "insensitive" } },
      { lastName: { contains: filters.search, mode: "insensitive" } },
    ];
  }
  const [items, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        profileImage: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        student: { select: { regNumber: true, program: true, intakeYear: true } },
        teacher: true,
        management: true,
      },
    }),
    prisma.user.count({ where }),
  ]);
  return { items, total };
}

export async function countUsers(filters: UserFilters) {
  const where: Record<string, unknown> = {};
  if (filters.role) where.role = filters.role;
  if (filters.isActive !== undefined) where.isActive = filters.isActive;
  if (filters.search) {
    where.OR = [
      { email: { contains: filters.search, mode: "insensitive" } },
      { firstName: { contains: filters.search, mode: "insensitive" } },
      { lastName: { contains: filters.search, mode: "insensitive" } },
    ];
  }
  return prisma.user.count({ where });
}

export async function userExists(email: string) {
  const u = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
  return !!u;
}
