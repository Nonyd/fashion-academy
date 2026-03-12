import prisma from "@/lib/prisma";
import { PAGINATION_DEFAULTS } from "@/lib/constants";

type Filters = {
  status?: string;
  paymentStatus?: string;
  program?: string;
  intakeYear?: number;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
};

export async function createAdmission(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: Date;
  nationality?: string;
  country: string;
  program: string;
  intakeYear: number;
  previousEducation?: string;
  portfolioUrl?: string;
  statementOfPurpose: string;
}) {
  return prisma.admission.create({ data });
}

export async function findAdmissionById(id: string) {
  return prisma.admission.findUnique({ where: { id } });
}

export async function findAdmissionByEmail(email: string) {
  return prisma.admission.findFirst({
    where: { email: email.toLowerCase() },
    orderBy: { createdAt: "desc" },
  });
}

export async function findAllAdmissions(
  filters: Filters,
  pagination: { page: number; limit: number }
) {
  const skip = (pagination.page - 1) * pagination.limit;
  const where: Record<string, unknown> = {};
  if (filters.status) where.status = filters.status;
  if (filters.paymentStatus) where.paymentStatus = filters.paymentStatus;
  if (filters.program) where.program = filters.program;
  if (filters.intakeYear) where.intakeYear = filters.intakeYear;
  if (filters.search) {
    where.OR = [
      { email: { contains: filters.search, mode: "insensitive" } },
      { firstName: { contains: filters.search, mode: "insensitive" } },
      { lastName: { contains: filters.search, mode: "insensitive" } },
    ];
  }
  if (filters.dateFrom)
    where.createdAt = { ...((where.createdAt as object) || {}), gte: new Date(filters.dateFrom) };
  if (filters.dateTo)
    where.createdAt = { ...((where.createdAt as object) || {}), lte: new Date(filters.dateTo) };

  const [items, total] = await Promise.all([
    prisma.admission.findMany({
      where,
      skip,
      take: pagination.limit ?? PAGINATION_DEFAULTS.LIMIT,
      orderBy: { createdAt: "desc" },
    }),
    prisma.admission.count({ where }),
  ]);
  return { items, total };
}

export async function countAdmissions(filters: Filters) {
  const where: Record<string, unknown> = {};
  if (filters.status) where.status = filters.status;
  if (filters.paymentStatus) where.paymentStatus = filters.paymentStatus;
  return prisma.admission.count({ where });
}

export async function updateAdmissionStatus(
  id: string,
  data: { status: string; reviewNotes?: string; reviewedById?: string }
) {
  return prisma.admission.update({
    where: { id },
    data: {
      status: data.status as "PENDING" | "ACCEPTED" | "REJECTED" | "WAITLISTED",
      reviewNotes: data.reviewNotes,
      reviewedAt: new Date(),
      reviewedById: data.reviewedById,
    },
  });
}

export async function getAdmissionStats() {
  const groups = await prisma.admission.groupBy({
    by: ["status"],
    _count: { id: true },
  });
  return groups.map((g) => ({ status: g.status, count: g._count.id }));
}
