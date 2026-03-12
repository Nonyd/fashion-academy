import prisma from "@/lib/prisma";
import { NotFoundError, PaymentError } from "@/lib/errors";
import * as mailService from "@/modules/mail/service";
import * as paymentQueries from "./queries";

export async function initializePaystack(input: {
  amount: number;
  currency?: string;
  purpose: string;
  admissionId?: string;
  studentId?: string;
  email: string;
  name: string;
}) {
  const ref = `PFA-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  await paymentQueries.createPayment({
    amount: input.amount,
    currency: input.currency ?? "NGN",
    purpose: input.purpose,
    provider: "PAYSTACK",
    transactionRef: ref,
    admissionId: input.admissionId,
    studentId: input.studentId,
    email: input.email,
    name: input.name,
  });
  const paystackKey = process.env.PAYSTACK_SECRET_KEY;
  if (paystackKey) {
    try {
      const res = await fetch("https://api.paystack.co/transaction/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${paystackKey}` },
        body: JSON.stringify({
          email: input.email,
          amount: input.amount * 100,
          reference: ref,
          metadata: { purpose: input.purpose },
        }),
      });
      const data = await res.json();
      if (data.data?.authorization_url)
        return { authorization_url: data.data.authorization_url, reference: ref };
    } catch (e) {
      console.error("Paystack init error", e);
    }
  }
  return { authorization_url: `https://example.com/pay?ref=${ref}`, reference: ref };
}

export async function verifyPaystack(reference: string) {
  const payment = await paymentQueries.findPaymentByRef(reference);
  if (!payment) throw new NotFoundError("Payment");
  const paystackKey = process.env.PAYSTACK_SECRET_KEY;
  if (paystackKey) {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${paystackKey}` },
    });
    const data = await res.json();
    if (data.data?.status === "success") {
      await paymentQueries.updatePaymentStatus(reference, "COMPLETED", data.data);
      if (payment.admissionId) {
        await prisma.admission.update({
          where: { id: payment.admissionId },
          data: { paymentStatus: "COMPLETED" },
        });
      }
      await mailService.sendTemplateToEmail("PAYMENT_CONFIRMED", payment.email, {
        amount: String(payment.amount),
        transactionRef: reference,
        name: payment.name,
      });
    }
  } else {
    await paymentQueries.updatePaymentStatus(reference, "COMPLETED");
  }
  return paymentQueries.findPaymentByRef(reference);
}

export async function initializeStripe(input: {
  amount: number;
  currency?: string;
  purpose: string;
  email: string;
  name: string;
}) {
  const ref = `stripe-${Date.now()}`;
  await paymentQueries.createPayment({
    amount: input.amount,
    currency: input.currency ?? "NGN",
    purpose: input.purpose,
    provider: "STRIPE",
    transactionRef: ref,
    email: input.email,
    name: input.name,
  });
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (stripeKey) {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeKey);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price_data: { currency: "ngn", unit_amount: Math.round(input.amount * 100), product_data: { name: input.purpose } }, quantity: 1 }],
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL ?? ""}/payments/success?ref=${ref}`,
      cancel_url: `${process.env.NEXTAUTH_URL ?? ""}/payments/cancel`,
      metadata: { reference: ref },
    });
    return { session_url: session.url, reference: ref };
  }
  return { session_url: `https://example.com/pay?ref=${ref}`, reference: ref };
}

export async function getPaymentHistory(studentId: string, filters: Record<string, unknown>) {
  return paymentQueries.findPaymentsByStudent(
    studentId,
    filters as Parameters<typeof paymentQueries.findPaymentsByStudent>[1]
  );
}

export async function getRevenueReport(filters: Record<string, unknown>) {
  const f = filters as { dateFrom?: string; dateTo?: string };
  return paymentQueries.getRevenueStats(f.dateFrom, f.dateTo);
}

export async function findAllPayments(
  filters: Record<string, unknown>,
  pagination: { page: number; limit: number }
) {
  return paymentQueries.findAllPayments(
    filters as Parameters<typeof paymentQueries.findAllPayments>[0],
    pagination
  );
}

export async function handlePaystackWebhook(body: unknown, signature: string) {
  const crypto = await import("crypto");
  const secret = process.env.PAYSTACK_SECRET_KEY ?? "";
  const hash = crypto.createHmac("sha512", secret).update(JSON.stringify(body)).digest("hex");
  if (hash !== signature) throw new Error("Invalid signature");
  const payload = body as { event?: string; data?: { reference?: string } };
  if (payload.event === "charge.success" && payload.data?.reference) {
    await verifyPaystack(payload.data.reference);
  }
  return { received: true };
}

export async function handleStripeWebhook(
  body: string | Buffer,
  signature: string
) {
  const Stripe = (await import("stripe")).default;
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return { received: true };
  const payload = typeof body === "string" ? body : body.toString("utf8");
  const event = Stripe.webhooks.constructEvent(
    payload,
    signature,
    secret
  ) as { type: string; data?: { object?: { metadata?: { reference?: string } } } };
  if (event.type === "checkout.session.completed" && event.data?.object?.metadata?.reference) {
    await paymentQueries.updatePaymentStatus(
      event.data.object.metadata.reference,
      "COMPLETED"
    );
  }
  return { received: true };
}
