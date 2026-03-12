export type InitializePaymentInput = {
  amount: number;
  currency?: string;
  purpose: string;
  admissionId?: string;
  studentId?: string;
  email: string;
  name: string;
};
