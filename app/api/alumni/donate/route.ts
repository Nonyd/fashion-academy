import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fundSlug, amount, frequency, anonymous, name, email } = body;

    if (!fundSlug || !amount || amount < 1000 || !email) {
      return NextResponse.json(
        { error: "Invalid donation data" },
        { status: 400 }
      );
    }

    // TODO: initialize Paystack; on webhook success trigger DONATION_CONFIRMED auto-email
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
