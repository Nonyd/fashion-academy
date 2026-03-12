import type { Role } from "@prisma/client";

export type CreateUserInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: Role;
  program?: string;
  intakeYear?: number;
};

export type UpdateUserInput = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  profileImage?: string;
};

export type UserProfile = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  profileImage: string | null;
  role: Role;
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  regNumber?: string;
  program?: string;
  intakeYear?: number;
};

export type UserWithRole = UserProfile;
