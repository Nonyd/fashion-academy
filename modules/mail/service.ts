import prisma from "@/lib/prisma";
import * as mailQueries from "./queries";
import type { MailPayload, TemplateData } from "./types";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function sendMail(payload: MailPayload): Promise<void> {
  const to = Array.isArray(payload.to) ? payload.to : [payload.to];
  if (RESEND_API_KEY) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.MAIL_FROM ?? "PFA <noreply@example.com>",
        to,
        subject: payload.subject,
        html: payload.html,
      });
    } catch (err) {
      console.error("Resend send failed:", err);
    }
  }
}

function interpolate(html: string, data: TemplateData): string {
  let out = html;
  for (const [key, value] of Object.entries(data)) {
    out = out.replace(new RegExp(`{{${key}}}`, "g"), value ?? "");
  }
  return out;
}

export async function triggerAutoMail(
  event: string,
  userId: string,
  templateData: TemplateData
): Promise<void> {
  const template = await mailQueries.getTemplate(event);
  if (!template || !template.isActive) return;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;
  const to = user.email;
  const data = { ...templateData, firstName: user.firstName, email: user.email };
  const subject = interpolate(template.subject, data);
  const bodyHtml = interpolate(template.bodyHtml, data);
  await sendMail({ to, subject, html: bodyHtml });
  await mailQueries.createNotification(
    userId,
    subject,
    bodyHtml.replace(/<[^>]*>/g, "").slice(0, 200),
    "email"
  );
}

/** Send template email to an address (e.g. applicant before they have a user). */
export async function sendTemplateToEmail(
  event: string,
  toEmail: string,
  templateData: TemplateData
): Promise<void> {
  const template = await mailQueries.getTemplate(event);
  if (!template || !template.isActive) return;
  const subject = interpolate(template.subject, templateData);
  const bodyHtml = interpolate(template.bodyHtml, templateData);
  await sendMail({ to: toEmail, subject, html: bodyHtml });
}

export async function sendBulkMail(
  recipients: "all" | "students" | "teachers" | string[],
  subject: string,
  body: string
): Promise<void> {
  let emails: string[] = [];
  if (recipients === "all") {
    const users = await prisma.user.findMany({ where: { isActive: true }, select: { email: true } });
    emails = users.map((u) => u.email);
  } else if (recipients === "students") {
    const users = await prisma.user.findMany({
      where: { role: "STUDENT", isActive: true },
      select: { email: true },
    });
    emails = users.map((u) => u.email);
  } else if (recipients === "teachers") {
    const users = await prisma.user.findMany({
      where: { role: "TEACHER", isActive: true },
      select: { email: true },
    });
    emails = users.map((u) => u.email);
  } else {
    emails = recipients;
  }
  for (const email of emails) {
    await sendMail({ to: email, subject, html: body });
    const u = await prisma.user.findFirst({ where: { email } });
    if (u) await mailQueries.createNotification(u.id, subject, body.slice(0, 200), "info");
  }
}

export async function getNotifications(userId: string, pagination: { page: number; limit: number }) {
  const skip = (pagination.page - 1) * pagination.limit;
  return mailQueries.getNotifications(userId, { skip, take: pagination.limit });
}

export async function markAsRead(notificationId: string, userId: string) {
  return mailQueries.markNotificationRead(notificationId);
}

export async function markAllAsRead(userId: string) {
  return mailQueries.markAllNotificationsRead(userId);
}

export async function getUnreadCount(userId: string) {
  return mailQueries.getUnreadCount(userId);
}

export async function getAllTemplates() {
  return mailQueries.getAllTemplates();
}

export async function updateTemplate(
  event: string,
  data: { subject?: string; bodyHtml?: string; isActive?: boolean }
) {
  return mailQueries.updateTemplate(event, data);
}
