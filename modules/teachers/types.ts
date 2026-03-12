export type TeacherProfile = {
  id: string;
  userId: string;
  title: string | null;
  bio: string | null;
  user: { firstName: string; lastName: string; email: string };
};

export type TeacherWithCourses = TeacherProfile & { courses: unknown[] };
export type TeacherDashboardData = TeacherProfile & {
  courses: unknown[];
  pendingProjects: number;
};
