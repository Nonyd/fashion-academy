export type StudentProfile = {
  id: string;
  userId: string;
  regNumber: string;
  program: string;
  intakeYear: number;
  enrollmentStatus: string;
  user: { firstName: string; lastName: string; email: string; phone: string | null };
};

export type StudentWithScores = StudentProfile & { scores: unknown[] };
export type StudentWithProjects = StudentProfile & { projects: unknown[] };

export type StudentDashboardData = {
  profile: StudentProfile;
  recentScores: unknown[];
  recentProjects: unknown[];
  recentPayments: unknown[];
  notifications: unknown[];
};

export type StudentFilters = {
  program?: string;
  intakeYear?: number;
  enrollmentStatus?: string;
  search?: string;
};
