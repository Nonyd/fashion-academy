import prisma from "@/lib/prisma";
import { ConflictError, NotFoundError } from "@/lib/errors";
import { generateRegNumber } from "@/lib/constants";
import * as authService from "@/modules/auth/service";
import * as mailService from "@/modules/mail/service";
import * as admissionQueries from "./queries";

export async function submitApplication(input: {
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
}) {
  const existing = await admissionQueries.findAdmissionByEmail(input.email);
  if (existing && existing.status === "PENDING") {
    throw new ConflictError("An application with this email is already pending");
  }
  const admission = await admissionQueries.createAdmission({
    ...input,
    dateOfBirth: input.dateOfBirth ? new Date(input.dateOfBirth) : undefined,
  });
  await mailService.sendTemplateToEmail("ADMISSION_RECEIVED", input.email, {
    firstName: input.firstName,
    email: input.email,
    programName: input.program,
  });
  return { admission, paymentInit: { amount: 0, currency: "NGN" } };
}

export async function processDecision(
  admissionId: string,
  decision: { status: "ACCEPTED" | "REJECTED" | "WAITLISTED"; reviewNotes?: string },
  managerId: string
) {
  const admission = await admissionQueries.findAdmissionById(admissionId);
  if (!admission) throw new NotFoundError("Admission");
  await admissionQueries.updateAdmissionStatus(admissionId, {
    status: decision.status,
    reviewNotes: decision.reviewNotes,
    reviewedById: managerId,
  });
  if (decision.status === "ACCEPTED") {
    const seq = await prisma.student.count();
    const regNumber = generateRegNumber(admission.program, admission.intakeYear, seq + 1);
    const tempPassword = Math.random().toString(36).slice(-8);
    const passwordHash = authService.hashPassword(tempPassword);
    const user = await prisma.user.create({
      data: {
        email: admission.email.toLowerCase(),
        passwordHash,
        firstName: admission.firstName,
        lastName: admission.lastName,
        phone: admission.phone,
        role: "STUDENT",
      },
    });
    await prisma.student.create({
      data: {
        userId: user.id,
        regNumber,
        program: admission.program,
        intakeYear: admission.intakeYear,
      },
    });
    await mailService.triggerAutoMail("ADMISSION_ACCEPTED", user.id, {
      firstName: admission.firstName,
      regNumber,
      email: admission.email,
      programName: admission.program,
    });
  } else if (decision.status === "REJECTED") {
    await mailService.sendTemplateToEmail("ADMISSION_REJECTED", admission.email, {
      firstName: admission.firstName,
      email: admission.email,
    });
  } else if (decision.status === "WAITLISTED") {
    await mailService.sendTemplateToEmail("ADMISSION_WAITLISTED", admission.email, {
      firstName: admission.firstName,
      email: admission.email,
    });
  }
  return admissionQueries.findAdmissionById(admissionId);
}

export async function getAdmissionPipeline() {
  return admissionQueries.getAdmissionStats();
}

export async function listAdmissions(
  filters: Record<string, unknown>,
  pagination: { page: number; limit: number }
) {
  return admissionQueries.findAllAdmissions(
    filters as Parameters<typeof admissionQueries.findAllAdmissions>[0],
    pagination
  );
}

export async function getAdmissionDetail(admissionId: string) {
  const a = await admissionQueries.findAdmissionById(admissionId);
  if (!a) throw new NotFoundError("Admission");
  return a;
}
