export type ScoreInput = {
  studentId: string;
  courseId: string;
  score: number;
  assessmentType: string;
  semester: number;
  feedback?: string;
};

export type ScoreFilters = {
  studentId?: string;
  courseId?: string;
  teacherId?: string;
  semester?: number;
  assessmentType?: string;
  minScore?: number;
  maxScore?: number;
};
