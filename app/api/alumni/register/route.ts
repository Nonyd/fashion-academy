import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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

    const alumni = await prisma.alumni.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone ?? null,
        regNumber,
        programme,
        graduationYear: Number(graduationYear),
        city,
        country,
      },
    });

    // TODO: trigger welcome auto-email
    return NextResponse.json({ success: true, id: alumni.id });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid request";
    if (message.includes("Unique constraint")) {
      return NextResponse.json(
        { error: "An alumni with this email or registration number already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
