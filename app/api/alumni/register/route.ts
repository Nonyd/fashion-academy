import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      regNumber,
      programme,
      graduationYear,
      city,
      country,
    } = body;

    if (!firstName || !lastName || !email || !regNumber || !programme || !graduationYear || !city || !country) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: persist alumni record (DB); trigger welcome auto-email
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
