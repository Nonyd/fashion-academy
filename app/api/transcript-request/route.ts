import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      regNumber,
      programme,
      graduationYear,
      copies,
      purpose,
      deliveryMethod,
    } = body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !regNumber ||
      !programme ||
      !graduationYear ||
      !copies ||
      !purpose ||
      !deliveryMethod
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: persist request; initialize Paystack; trigger auto-email confirmation
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
