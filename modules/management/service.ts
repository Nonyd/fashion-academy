import prisma from "@/lib/prisma";

export type DashboardStats = {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  pendingAdmissions: number;
  revenueThisMonth: number;
  projectsPendingReview: number;
  acceptanceRate: number;
  totalAlumni: number;
};

export async function getManagementDashboard(): Promise<{
  stats: DashboardStats;
  admissionFunnel: { stage: string; count: number }[];
  revenueByMonth: { month: string; amount: number }[];
  recentAdmissions: unknown[];
  recentPayments: unknown[];
  systemAlerts: { type: string; message: string; count: number }[];
}> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    totalStudents,
    totalTeachers,
    totalCourses,
    pendingAdmissions,
    revenueThisMonthResult,
    projectsPendingReview,
    acceptedCount,
    totalAdmissionsWithDecision,
    totalAlumni,
    admissionFunnelRaw,
    revenueByMonthRaw,
    recentAdmissions,
    recentPayments,
  ] = await Promise.all([
    prisma.student.count(),
    prisma.teacher.count(),
    prisma.course.count({ where: { isArchived: false } }),
    prisma.admission.count({ where: { status: "PENDING" } }),
    prisma.payment.aggregate({
      where: {
        status: "COMPLETED",
        createdAt: { gte: startOfMonth },
      },
      _sum: { amount: true },
    }),
    prisma.project.count({ where: { status: "SUBMITTED" } }),
    prisma.admission.count({ where: { status: "ACCEPTED" } }),
    prisma.admission.count({
      where: { status: { in: ["ACCEPTED", "REJECTED"] } },
    }),
    prisma.alumni.count(),
    prisma.admission.groupBy({
      by: ["status"],
      _count: { id: true },
    }),
    prisma.payment.groupBy({
      by: ["createdAt"],
      where: { status: "COMPLETED" },
      _sum: { amount: true },
    }),
    prisma.admission.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
    prisma.payment.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const revenueThisMonth = revenueThisMonthResult._sum.amount ?? 0;
  const acceptanceRate =
    totalAdmissionsWithDecision > 0
      ? Math.round((acceptedCount / totalAdmissionsWithDecision) * 100)
      : 0;

  const admissionFunnel = admissionFunnelRaw.map((r) => ({
    stage: r.status,
    count: r._count.id,
  }));

  const monthMap: Record<string, number> = {};
  for (const r of revenueByMonthRaw) {
    const key = r.createdAt.toISOString().slice(0, 7);
    monthMap[key] = (monthMap[key] ?? 0) + (r._sum.amount ?? 0);
  }
  const revenueByMonth = Object.entries(monthMap).map(([month, amount]) => ({
    month,
    amount,
  }));

  const systemAlerts: { type: string; message: string; count: number }[] = [];
  if (projectsPendingReview > 0) {
    systemAlerts.push({
      type: "warning",
      message: "Projects pending review",
      count: projectsPendingReview,
    });
  }
  if (pendingAdmissions > 0) {
    systemAlerts.push({
      type: "info",
      message: "Pending admissions",
      count: pendingAdmissions,
    });
  }

  return {
    stats: {
      totalStudents,
      totalTeachers,
      totalCourses,
      pendingAdmissions,
      revenueThisMonth,
      projectsPendingReview,
      acceptanceRate,
      totalAlumni,
    },
    admissionFunnel,
    revenueByMonth,
    recentAdmissions,
    recentPayments,
    systemAlerts,
  };
}
