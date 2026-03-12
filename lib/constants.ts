export const ROLES = {
  STUDENT: "STUDENT",
  TEACHER: "TEACHER",
  MANAGEMENT: "MANAGEMENT",
} as const;

export type RoleType = (typeof ROLES)[keyof typeof ROLES];

export const GRADE_THRESHOLDS = {
  A_PLUS: 90,
  A: 80,
  B_PLUS: 70,
  B: 60,
  C: 50,
  F: 0,
} as const;

export function calculateGrade(score: number): string {
  if (score >= GRADE_THRESHOLDS.A_PLUS) return "A+";
  if (score >= GRADE_THRESHOLDS.A) return "A";
  if (score >= GRADE_THRESHOLDS.B_PLUS) return "B+";
  if (score >= GRADE_THRESHOLDS.B) return "B";
  if (score >= GRADE_THRESHOLDS.C) return "C";
  return "F";
}

export const REG_NUMBER_PREFIX = "PFA";

export const PROGRAM_CODES: Record<string, string> = {
  "Fashion Design": "FD",
  "Fashion Business & Luxury Management": "FB",
  "Styling & Art Direction": "ST",
  "Textile Design": "TD",
  "Fashion Photography": "FP",
  "Fashion Technology & AI": "FT",
};

export function generateRegNumber(
  program: string,
  year: number,
  sequence: number
): string {
  const code = PROGRAM_CODES[program] ?? "XX";
  const seq = String(sequence).padStart(5, "0");
  return `${REG_NUMBER_PREFIX}-${year}-${code}-${seq}`;
}

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 20,
  MAX_LIMIT: 100,
} as const;
