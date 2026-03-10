"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { programs } from "@/lib/data";
import {
  campuses,
  getAvailableSlots,
  APPLICATION_FORM_STEPS,
  type StepId,
  type CampusId,
} from "@/lib/applicationForm";

export type FormValues = {
  // Personal
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  address: string;
  city: string;
  state: string;
  // Applicant type
  applicantType: "fresh" | "transfer" | "mature";
  previousInstitution: string;
  previousProgram: string;
  yearLeft: string;
  // Program & campus
  programId: string;
  preferredCampus: CampusId | "";
  // Education
  hasPreviousEducation: "yes" | "no";
  institutionName: string;
  qualification: string;
  yearObtained: string;
  workExperience: string;
  // Additional
  howDidYouHear: string;
  additionalNotes: string;
};

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  nationality: "",
  address: "",
  city: "",
  state: "",
  applicantType: "fresh",
  previousInstitution: "",
  previousProgram: "",
  yearLeft: "",
  programId: "",
  preferredCampus: "",
  hasPreviousEducation: "no",
  institutionName: "",
  qualification: "",
  yearObtained: "",
  workExperience: "",
  howDidYouHear: "",
  additionalNotes: "",
};

function stepIdToIndex(stepId: StepId): number {
  const i = APPLICATION_FORM_STEPS.findIndex((s) => s.id === stepId);
  return i >= 0 ? i : 0;
}

export default function ApplicationForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [submitIntent, setSubmitIntent] = useState(false);

  const stepId = APPLICATION_FORM_STEPS[stepIndex]?.id ?? "personal";
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === APPLICATION_FORM_STEPS.length - 1;

  const set = useCallback((field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const availableSlots = getAvailableSlots(values.preferredCampus);
  const showTransferFields = values.applicantType === "transfer";
  const showEducationFields = values.hasPreviousEducation === "yes";

  const canProceed = (): boolean => {
    if (stepId === "personal") {
      return !!(
        values.firstName?.trim() &&
        values.lastName?.trim() &&
        values.email?.trim() &&
        values.phone?.trim()
      );
    }
    if (stepId === "applicant-type") {
      if (values.applicantType === "transfer")
        return !!(values.previousInstitution?.trim() && values.previousProgram?.trim());
      return true;
    }
    if (stepId === "program-campus") {
      return !!(values.programId && values.preferredCampus);
    }
    if (stepId === "education") return true;
    if (stepId === "additional") return true;
    if (stepId === "review") return true;
    return true;
  };

  const goNext = () => {
    if (!canProceed() && stepId !== "review") return;
    if (isLast) {
      setSubmitIntent(true);
      return;
    }
    setStepIndex((i) => Math.min(i + 1, APPLICATION_FORM_STEPS.length - 1));
  };

  const goPrev = () => setStepIndex((i) => Math.max(0, i - 1));

  const goToStep = (id: StepId) => {
    const idx = stepIdToIndex(id);
    setStepIndex(idx);
  };

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between gap-2">
          {APPLICATION_FORM_STEPS.map((step, i) => (
            <button
              key={step.id}
              type="button"
              onClick={() => goToStep(step.id)}
              className={`flex flex-1 items-center gap-1 rounded-lg border px-2 py-2 text-left text-xs transition-colors sm:px-3 ${
                i <= stepIndex
                  ? "border-[var(--color-gold)]/50 bg-[var(--color-gold)]/10 text-[var(--color-ivory)]"
                  : "border-white/10 bg-white/5 text-[var(--color-muted)]"
              }`}
            >
              {i < stepIndex ? (
                <Check className="h-3.5 w-3.5 shrink-0 text-[var(--color-gold)]" />
              ) : (
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-medium">
                  {i + 1}
                </span>
              )}
              <span className="hidden truncate sm:inline">{step.label}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stepId}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl border border-white/10 bg-[var(--color-charcoal)]/60 p-6 sm:p-8"
        >
          {stepId === "personal" && (
            <PersonalStep values={values} set={set} />
          )}
          {stepId === "applicant-type" && (
            <ApplicantTypeStep values={values} set={set} showTransfer={showTransferFields} />
          )}
          {stepId === "program-campus" && (
            <ProgramCampusStep
              values={values}
              set={set}
              availableSlots={availableSlots}
            />
          )}
          {stepId === "education" && (
            <EducationStep values={values} set={set} showEducation={showEducationFields} />
          )}
          {stepId === "additional" && (
            <AdditionalStep values={values} set={set} />
          )}
          {stepId === "review" && (
            <ReviewStep values={values} programs={programs} campuses={campuses} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Actions */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={goPrev}
          disabled={isFirst}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-ivory)] transition-colors disabled:opacity-40 hover:border-[var(--color-gold)]/40 hover:bg-white/5"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        <button
          type="button"
          onClick={goNext}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-noir)] transition-colors hover:bg-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] disabled:opacity-60"
        >
          {isLast ? "Make payments" : "Continue"}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {submitIntent && (
        <p className="mt-4 text-center text-sm text-[var(--color-gold)]">
          Payment integration can be connected here. Form data is ready to submit.
        </p>
      )}
    </div>
  );
}

function PersonalStep({
  values,
  set,
}: {
  values: FormValues;
  set: (f: keyof FormValues, v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[var(--color-ivory)]">
        Personal details
      </h2>
      <p className="text-sm text-[var(--color-ivory)]/70">
        Enter your full name and contact information.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
            First name *
          </span>
          <input
            type="text"
            value={values.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none"
            placeholder="e.g. Ada"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
            Last name *
          </span>
          <input
            type="text"
            value={values.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none"
            placeholder="e.g. Okafor"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
            Email *
          </span>
          <input
            type="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none"
            placeholder="ada@example.com"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
            Phone *
          </span>
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none"
            placeholder="+234 800 000 0000"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
            Date of birth
          </span>
          <input
            type="date"
            value={values.dateOfBirth}
            onChange={(e) => set("dateOfBirth", e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] focus:border-[var(--color-gold)] focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
            Gender
          </span>
          <select
            value={values.gender}
            onChange={(e) => set("gender", e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] focus:border-[var(--color-gold)] focus:outline-none"
          >
            <option value="">Select</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="non-binary">Non-binary</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
          Nationality
        </span>
        <input
          type="text"
          value={values.nationality}
          onChange={(e) => set("nationality", e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none"
          placeholder="e.g. Nigerian"
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
          Address
        </span>
        <input
          type="text"
          value={values.address}
          onChange={(e) => set("address", e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none"
          placeholder="Street, area"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
            City
          </span>
          <input
            type="text"
            value={values.city}
            onChange={(e) => set("city", e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none"
            placeholder="e.g. Lagos"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
            State
          </span>
          <input
            type="text"
            value={values.state}
            onChange={(e) => set("state", e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none"
            placeholder="e.g. Lagos"
          />
        </label>
      </div>
    </div>
  );
}

function ApplicantTypeStep({
  values,
  set,
  showTransfer,
}: {
  values: FormValues;
  set: (f: keyof FormValues, v: string) => void;
  showTransfer: boolean;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[var(--color-ivory)]">
        Applicant type
      </h2>
      <p className="text-sm text-[var(--color-ivory)]/70">
        Tell us how you are applying so we can show the right questions.
      </p>
      <div>
        <span className="mb-2 block text-xs font-medium text-[var(--color-muted)]">
          I am applying as *
        </span>
        <div className="flex flex-wrap gap-3">
          {[
            { value: "fresh", label: "Fresh applicant" },
            { value: "transfer", label: "Transfer student" },
            { value: "mature", label: "Mature applicant" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 has-[:checked]:border-[var(--color-gold)] has-[:checked]:bg-[var(--color-gold)]/10"
            >
              <input
                type="radio"
                name="applicantType"
                value={opt.value}
                checked={values.applicantType === opt.value}
                onChange={() => set("applicantType", opt.value)}
                className="h-4 w-4 border-white/30 text-[var(--color-gold)] focus:ring-[var(--color-gold)]"
              />
              <span className="text-sm text-[var(--color-ivory)]">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {showTransfer && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4 rounded-xl border border-[var(--color-gold)]/20 bg-[var(--color-gold)]/5 p-4"
        >
          <p className="text-xs font-medium text-[var(--color-gold)]">
            Transfer details
          </p>
          <label className="block">
            <span className="mb-1 block text-xs text-[var(--color-muted)]">
              Previous institution *
            </span>
            <input
              type="text"
              value={values.previousInstitution}
              onChange={(e) => set("previousInstitution", e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none"
              placeholder="Name of school"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-[var(--color-muted)]">
              Program studied *
            </span>
            <input
              type="text"
              value={values.previousProgram}
              onChange={(e) => set("previousProgram", e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none"
              placeholder="e.g. Fashion Design"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-[var(--color-muted)]">
              Year left (optional)
            </span>
            <input
              type="text"
              value={values.yearLeft}
              onChange={(e) => set("yearLeft", e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none"
              placeholder="e.g. 2024"
            />
          </label>
        </motion.div>
      )}
    </div>
  );
}

function ProgramCampusStep({
  values,
  set,
  availableSlots,
}: {
  values: FormValues;
  set: (f: keyof FormValues, v: string) => void;
  availableSlots: number | null;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[var(--color-ivory)]">
        Program & campus
      </h2>
      <p className="text-sm text-[var(--color-ivory)]/70">
        Choose your program and preferred campus. Available slots are shown when you select a campus.
      </p>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
          Program *
        </span>
        <select
          value={values.programId}
          onChange={(e) => set("programId", e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] focus:border-[var(--color-gold)] focus:outline-none"
        >
          <option value="">Select a program</option>
          {programs.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} — {p.duration}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
          Preferred campus *
        </span>
        <select
          value={values.preferredCampus}
          onChange={(e) => set("preferredCampus", e.target.value as CampusId | "")}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] focus:border-[var(--color-gold)] focus:outline-none"
        >
          <option value="">Select campus</option>
          {campuses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}, {c.city}
            </option>
          ))}
        </select>
      </label>

      {values.preferredCampus && availableSlots !== null && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-4 py-3"
        >
          <p className="text-sm font-medium text-[var(--color-ivory)]">
            Total available slots at this campus:{" "}
            <span className="text-[var(--color-gold)]">{availableSlots}</span>
          </p>
          <p className="mt-1 text-xs text-[var(--color-muted)]">
            Slots are based on maximum intake minus current enrolments and may change.
          </p>
        </motion.div>
      )}
    </div>
  );
}

function EducationStep({
  values,
  set,
  showEducation,
}: {
  values: FormValues;
  set: (f: keyof FormValues, v: string) => void;
  showEducation: boolean;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[var(--color-ivory)]">
        Education & experience
      </h2>
      <p className="text-sm text-[var(--color-ivory)]/70">
        Previous qualifications and work experience (if any).
      </p>
      <div>
        <span className="mb-2 block text-xs font-medium text-[var(--color-muted)]">
          Do you have previous fashion or design education?
        </span>
        <div className="flex gap-4">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="hasPreviousEducation"
              value="yes"
              checked={values.hasPreviousEducation === "yes"}
              onChange={() => set("hasPreviousEducation", "yes")}
              className="h-4 w-4 border-white/30 text-[var(--color-gold)] focus:ring-[var(--color-gold)]"
            />
            <span className="text-sm text-[var(--color-ivory)]">Yes</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="hasPreviousEducation"
              value="no"
              checked={values.hasPreviousEducation === "no"}
              onChange={() => set("hasPreviousEducation", "no")}
              className="h-4 w-4 border-white/30 text-[var(--color-gold)] focus:ring-[var(--color-gold)]"
            />
            <span className="text-sm text-[var(--color-ivory)]">No</span>
          </label>
        </div>
      </div>

      {showEducation && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="space-y-4 rounded-xl border border-[var(--color-gold)]/20 bg-[var(--color-gold)]/5 p-4"
        >
          <p className="text-xs font-medium text-[var(--color-gold)]">
            Previous education details
          </p>
          <label className="block">
            <span className="mb-1 block text-xs text-[var(--color-muted)]">
              Institution name
            </span>
            <input
              type="text"
              value={values.institutionName}
              onChange={(e) => set("institutionName", e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none"
              placeholder="School or academy name"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-[var(--color-muted)]">
              Qualification
            </span>
            <input
              type="text"
              value={values.qualification}
              onChange={(e) => set("qualification", e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none"
              placeholder="e.g. Certificate, Diploma"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-[var(--color-muted)]">
              Year obtained
            </span>
            <input
              type="text"
              value={values.yearObtained}
              onChange={(e) => set("yearObtained", e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none"
              placeholder="e.g. 2022"
            />
          </label>
        </motion.div>
      )}

      <label className="block">
        <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
          Work experience (optional)
        </span>
        <textarea
          value={values.workExperience}
          onChange={(e) => set("workExperience", e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none"
          placeholder="Brief description of relevant experience"
        />
      </label>
    </div>
  );
}

function AdditionalStep({
  values,
  set,
}: {
  values: FormValues;
  set: (f: keyof FormValues, v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[var(--color-ivory)]">
        Additional information
      </h2>
      <p className="text-sm text-[var(--color-ivory)]/70">
        Help us know how you found us and any notes you’d like to add.
      </p>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
          How did you hear about us?
        </span>
        <select
          value={values.howDidYouHear}
          onChange={(e) => set("howDidYouHear", e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] focus:border-[var(--color-gold)] focus:outline-none"
        >
          <option value="">Select</option>
          <option value="social">Social media</option>
          <option value="search">Search / Google</option>
          <option value="friend">Friend or family</option>
          <option value="event">Open day / Event</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
          Additional notes (optional)
        </span>
        <textarea
          value={values.additionalNotes}
          onChange={(e) => set("additionalNotes", e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:outline-none"
          placeholder="Anything else you’d like us to know"
        />
      </label>
    </div>
  );
}

function ReviewStep({
  values,
  programs: programList,
  campuses: campusList,
}: {
  values: FormValues;
  programs: typeof programs;
  campuses: typeof campuses;
}) {
  const program = programList.find((p) => p.id === values.programId);
  const campus = campusList.find((c) => c.id === values.preferredCampus);
  const slots = values.preferredCampus ? getAvailableSlots(values.preferredCampus) : null;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[var(--color-ivory)]">
        Review & payment
      </h2>
      <p className="text-sm text-[var(--color-ivory)]/70">
        Confirm your details below. Click “Make payments” to proceed to payment.
      </p>
      <div className="space-y-4 text-sm">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">
            Personal
          </p>
          <p className="text-[var(--color-ivory)]">
            {[values.firstName, values.lastName].filter(Boolean).join(" ") || "—"}
          </p>
          <p className="text-[var(--color-ivory)]/80">{values.email || "—"}</p>
          <p className="text-[var(--color-ivory)]/80">{values.phone || "—"}</p>
          {(values.city || values.state) && (
            <p className="text-[var(--color-ivory)]/80">
              {[values.city, values.state].filter(Boolean).join(", ")}
            </p>
          )}
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">
            Applicant type
          </p>
          <p className="capitalize text-[var(--color-ivory)]">{values.applicantType}</p>
          {values.applicantType === "transfer" && (
            <p className="mt-1 text-[var(--color-ivory)]/80">
              {values.previousInstitution} — {values.previousProgram}
            </p>
          )}
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">
            Program & campus
          </p>
          <p className="text-[var(--color-ivory)]">{program?.name ?? "—"}</p>
          <p className="text-[var(--color-ivory)]/80">
            {campus ? `${campus.name}, ${campus.city}` : "—"}
          </p>
          {slots !== null && (
            <p className="mt-1 text-[var(--color-gold)]">
              Available slots at this campus: {slots}
            </p>
          )}
        </div>
        {(values.hasPreviousEducation === "yes" && (values.institutionName || values.qualification)) && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">
              Education
            </p>
            <p className="text-[var(--color-ivory)]">
              {values.institutionName} — {values.qualification}
              {values.yearObtained && ` (${values.yearObtained})`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
