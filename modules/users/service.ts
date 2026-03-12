import prisma from "@/lib/prisma";
import { ConflictError, NotFoundError } from "@/lib/errors";
import { generateRegNumber } from "@/lib/constants";
import * as authService from "@/modules/auth/service";
import * as userQueries from "./queries";
import * as mailService from "@/modules/mail/service";
import type { CreateUserInput, UpdateUserInput } from "./types";

export async function createUser(input: CreateUserInput) {
  const exists = await userQueries.userExists(input.email);
  if (exists) throw new ConflictError("User with this email already exists");
  const passwordHash = authService.hashPassword(input.password);
  const user = await userQueries.createUser({
    email: input.email,
    passwordHash,
    firstName: input.firstName,
    lastName: input.lastName,
    phone: input.phone,
    role: input.role,
  });
  if (input.role === "STUDENT" && input.program != null && input.intakeYear != null) {
    const seq = await prisma.student.count();
    const regNumber = generateRegNumber(input.program, input.intakeYear, seq + 1);
    await prisma.student.create({
      data: {
        userId: user.id,
        regNumber,
        program: input.program,
        intakeYear: input.intakeYear,
      },
    });
  } else if (input.role === "TEACHER") {
    await prisma.teacher.create({ data: { userId: user.id } });
  } else if (input.role === "MANAGEMENT") {
    await prisma.management.create({ data: { userId: user.id } });
  }
  await mailService.triggerAutoMail("ACCOUNT_CREATED", user.id, {
    firstName: input.firstName,
    email: input.email,
  });
  const full = await userQueries.findUserById(user.id);
  if (!full) throw new NotFoundError("User");
  const { passwordHash: _, ...safe } = full;
  return safe;
}

export async function updateUser(userId: string, input: UpdateUserInput) {
  await userQueries.updateUser(userId, input);
  return getUserProfile(userId);
}

export async function deactivateUser(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { isActive: false },
  });
}

export async function reactivateUser(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { isActive: true },
  });
}

export async function getUserProfile(userId: string) {
  const user = await userQueries.findUserById(userId);
  if (!user) throw new NotFoundError("User");
  const { passwordHash: _, ...safe } = user;
  return {
    ...safe,
    regNumber: user.student?.regNumber,
    program: user.student?.program,
    intakeYear: user.student?.intakeYear,
  };
}
