import prisma from "@/lib/prisma";

export async function generateAcademicReport(filters: { program?: string; semester?: number }) {
  const courseWhere: Record<string, unknown> = {};
  if (filters.program) courseWhere.program = filters.program;
  if (filters.semester) courseWhere.semester = filters.semester;
  const scores = await prisma.score.findMany({
    where: Object.keys(courseWhere).length ? { course: courseWhere } : {},
    include: { student: { include: { user: true } }, course: true },
  });
  const byCourse: Record<string, { scores: number[]; avg: number }> = {};
  for (const s of scores) {
    const k = s.courseId;
    if (!byCourse[k]) byCourse[k] = { scores: [], avg: 0 };
    byCourse[k].scores.push(s.score);
  }
  for (const k of Object.keys(byCourse)) {
    const arr = byCourse[k].scores;
    byCourse[k].avg = arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
  }
  return { scores, byCourse };
}

export async function generateAdmissionsReport(filters: { dateFrom?: string; dateTo?: string }) {
  const where: Record<string, unknown> = {};
  if (filters.dateFrom) where.createdAt = { gte: new Date(filters.dateFrom) };
  if (filters.dateTo) where.createdAt = { ...((where.createdAt as object) || {}), lte: new Date(filters.dateTo) };
  const admissions = await prisma.admission.findMany({ where });
  const byStatus: Record<string, number> = {};
  for (const a of admissions) {
    byStatus[a.status] = (byStatus[a.status] ?? 0) + 1;
  }
  return { admissions, byStatus, total: admissions.length };
}

export async function generateFinancialReport(filters: { dateFrom?: string; dateTo?: string }) {
  const where: Record<string, unknown> = { status: "COMPLETED" };
  if (filters.dateFrom) where.createdAt = { gte: new Date(filters.dateFrom) };
  if (filters.dateTo) where.createdAt = { ...((where.createdAt as object) || {}), lte: new Date(filters.dateTo) };
  const payments = await prisma.payment.findMany({ where });
  const total = payments.reduce((a, p) => a + p.amount, 0);
  const byPurpose: Record<string, number> = {};
  for (const p of payments) {
    byPurpose[p.purpose] = (byPurpose[p.purpose] ?? 0) + p.amount;
  }
  return { payments, total, byPurpose };
}

export async function generateEnrollmentReport() {
  const students = await prisma.student.findMany();
  const byProgram: Record<string, number> = {};
  const byYear: Record<number, number> = {};
  for (const s of students) {
    byProgram[s.program] = (byProgram[s.program] ?? 0) + 1;
    byYear[s.intakeYear] = (byYear[s.intakeYear] ?? 0) + 1;
  }
  return { byProgram, byYear, total: students.length };
}

export function exportToCsv(data: Record<string, unknown>[], filename: string): string {
  if (data.length === 0) return "";
  const keys = Object.keys(data[0] as object);
  const header = keys.join(",");
  const rows = data.map((row) =>
    keys.map((k) => {
      const v = (row as Record<string, unknown>)[k];
      const s = v == null ? "" : String(v);
      return s.includes(",") ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(",")
  );
  return [header, ...rows].join("\n");
}
