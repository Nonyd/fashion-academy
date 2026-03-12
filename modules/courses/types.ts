export type CourseInput = {
  title: string;
  code: string;
  description?: string;
  program: string;
  semester: number;
  teacherId?: string;
};

export type CourseFilters = {
  program?: string;
  semester?: number;
  teacherId?: string;
  search?: string;
};
