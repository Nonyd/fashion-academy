import prisma from "@/lib/prisma";

export async function getTemplate(triggerEvent: string) {
  return prisma.mailTemplate.findUnique({
    where: { event: triggerEvent },
  });
}

export async function updateTemplate(
  triggerEvent: string,
  data: { subject?: string; bodyHtml?: string; isActive?: boolean }
) {
  return prisma.mailTemplate.upsert({
    where: { event: triggerEvent },
    create: {
      event: triggerEvent,
      subject: data.subject ?? "",
      bodyHtml: data.bodyHtml ?? "",
      isActive: data.isActive ?? true,
    },
    update: data,
  });
}

export async function getAllTemplates() {
  return prisma.mailTemplate.findMany({ orderBy: { event: "asc" } });
}

export async function createNotification(
  userId: string,
  title: string,
  message: string,
  type: string = "info"
) {
  return prisma.notification.create({
    data: { userId, title, message, type },
  });
}

export async function getNotifications(
  userId: string,
  pagination: { skip: number; take: number }
) {
  const [items, total] = await Promise.all([
    prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      ...pagination,
    }),
    prisma.notification.count({ where: { userId } }),
  ]);
  return { items, total };
}

export async function markNotificationRead(notificationId: string) {
  return prisma.notification.update({
    where: { id: notificationId },
    data: { read: true },
  });
}

export async function markAllNotificationsRead(userId: string) {
  await prisma.notification.updateMany({
    where: { userId },
    data: { read: true },
  });
}

export async function getUnreadCount(userId: string) {
  return prisma.notification.count({
    where: { userId, read: false },
  });
}
