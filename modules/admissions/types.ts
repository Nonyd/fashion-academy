export type AdmissionInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  nationality?: string;
  country: string;
  program: string;
  intakeYear: number;
  previousEducation?: string;
  portfolioUrl?: string;
  statementOfPurpose: string;
};

export type AdmissionFilters = {
  status?: string;
  paymentStatus?: string;
  program?: string;
  intakeYear?: number;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
};

export type AdmissionDecision = {
  status: "ACCEPTED" | "REJECTED" | "WAITLISTED";
  reviewNotes?: string;
};
