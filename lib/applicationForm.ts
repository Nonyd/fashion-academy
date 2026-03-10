/**
 * Application form config: campuses, max intake, and slot calculation.
 * In production, currentEnrolled would come from an API.
 */

export type CampusId = "lagos-egbeda" | "lagos-ajah" | "lagos-ojodu" | "abuja";

export type CampusOption = {
  id: CampusId;
  name: string;
  city: string;
  maxIntake: number;
  /** Simulated current enrolled; replace with API in production */
  currentEnrolled: number;
};

export const campuses: CampusOption[] = [
  { id: "lagos-egbeda", name: "Egbeda", city: "Lagos", maxIntake: 45, currentEnrolled: 28 },
  { id: "lagos-ajah", name: "Ajah", city: "Lagos", maxIntake: 40, currentEnrolled: 31 },
  { id: "lagos-ojodu", name: "Ojodu", city: "Lagos", maxIntake: 50, currentEnrolled: 19 },
  { id: "abuja", name: "Abuja", city: "Abuja", maxIntake: 60, currentEnrolled: 42 },
];

/** Get available slots for a campus (max intake - current enrolled). */
export function getAvailableSlots(campusId: CampusId | ""): number | null {
  if (!campusId) return null;
  const campus = campuses.find((c) => c.id === campusId);
  if (!campus) return null;
  const available = campus.maxIntake - campus.currentEnrolled;
  return Math.max(0, available);
}

export const APPLICATION_FORM_STEPS = [
  { id: "personal", label: "Personal details" },
  { id: "applicant-type", label: "Applicant type" },
  { id: "program-campus", label: "Program & campus" },
  { id: "education", label: "Education & experience" },
  { id: "additional", label: "Additional information" },
  { id: "review", label: "Review & payment" },
] as const;

export type StepId = (typeof APPLICATION_FORM_STEPS)[number]["id"];
