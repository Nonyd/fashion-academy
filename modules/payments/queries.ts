import prisma from "@/lib/prisma";
import { PAGINATION_DEFAULTS } from "@/lib/constants";

type Filters = {
  studentId?: string;
  admissionId?: string;
  purpose?: string;
  status?: string;
  provider?: string;
  dateFrom?: string;
  dateTo?: string;
};

export async function createPayment(data: {
  amount: number;
  currency: string;
  purpose: string;
  provider: string;
  transactionRef?: string;
  admissionId?: string;
  studentId?: string;
  email: string;
  name: string;
}) {
  return prisma.payment.create({ data });
}

export async function updatePaymentStatus(
  transactionRef: string,
  status: string,
  metadata?: Record<string, unknown>
) {
  return prisma.payment.updateMany({
    where: { transactionRef },
    data: { status: status as "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED", metadata: metadata ?? undefined },
  });
}

export async function findPaymentById(id: string) {
  return prisma.payment.findUnique({ where: { id } });
}

export async function findPaymentByRef(transactionRef: string) {
  return prisma.payment.findFirst({ where: { transactionRef } });
}

export async function findPaymentsByStudent(studentId: string, filters: Filters) {
  const where: Record<string, unknown> = { studentId };
  if (filters.status) where.status = filters.status;
  if (filters.purpose) where.purpose = filters.purpose;
  return prisma.payment.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

export async function findAllPayments(filters: Filters, pagination: { page: number; limit: number }) {
  const skip = (pagination.page - 1) * pagination.limit;
  const where: Record<string, unknown> = {};
  if (filters.studentId) where.studentId = filters.studentId;
  if (filters.admissionId) where.admissionId = filters.admissionId;
  if (filters.purpose) where.purpose = filters.purpose;
  if (filters.status) where.status = filters.status;
  if (filters.provider) where.provider = filters.provider;
  if (filters.dateFrom) where.createdAt = { gte: new Date(filters.dateFrom) };
  if (filters.dateTo) where.createdAt = { ...((where.createdAt as object) || {}), lte: new Date(filters.dateTo) };
  const [items, total] = await Promise.all([
    prisma.payment.findMany({
      where,
      skip,
      take: pagination.limit ?? PAGINATION_DEFAULTS.LIMIT,
      orderBy: { createdAt: "desc" },
    }),
    prisma.payment.count({ where }),
  ]);
  return { items, total };
}

export async function getRevenueStats(dateFrom?: string, dateTo?: string) {
  const where: Record<string, unknown> = { status: "COMPLETED" };
  if (dateFrom) where.createdAt = { gte: new Date(dateFrom) };
  if (dateTo) where.createdAt = { ...((where.createdAt as object) || {}), lte: new Date(dateTo) };
  return prisma.payment.aggregate({
    where,
    _sum: { amount: true },
    _count: true,
  });
}
