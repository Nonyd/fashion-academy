export type ProjectInput = {
  title: string;
  description?: string;
  courseId: string;
  fileUrl: string;
  thumbnailUrl?: string;
};

export type ProjectReview = {
  status: "APPROVED" | "REJECTED" | "REVISION_REQUESTED";
  teacherFeedback: string;
  grade?: number;
};
