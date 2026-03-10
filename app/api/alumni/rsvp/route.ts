import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventSlug } = body;

    if (!eventSlug) {
      return NextResponse.json(
        { error: "Event required" },
        { status: 400 }
      );
    }

    // TODO: check auth; if not authenticated return 401 so client redirects to /auth/login
    // TODO: persist RSVP; return success
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
