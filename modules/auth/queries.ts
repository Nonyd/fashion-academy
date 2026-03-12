import prisma from "@/lib/prisma";

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase(), isActive: true },
    include: {
      student: true,
      teacher: true,
      management: true,
    },
  });
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id, isActive: true },
    include: {
      student: true,
      teacher: true,
      management: true,
    },
  });
}

export async function updateUserPassword(userId: string, hashedPassword: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { passwordHash: hashedPassword },
  });
}

export async function updateLastLogin(userId: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { lastLoginAt: new Date() },
  });
}
