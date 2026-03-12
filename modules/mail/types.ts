export type MailPayload = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
};

export type TemplateData = Record<string, string>;

export type MailTrigger =
  | "ACCOUNT_CREATED"
  | "ADMISSION_RECEIVED"
  | "ADMISSION_ACCEPTED"
  | "ADMISSION_REJECTED"
  | "ADMISSION_WAITLISTED"
  | "SCORE_PUBLISHED"
  | "PROJECT_REVIEWED"
  | "PROJECT_APPROVED"
  | "PROJECT_REJECTED"
  | "PAYMENT_CONFIRMED"
  | "PASSWORD_RESET"
  | "WELCOME";
