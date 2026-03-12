import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { handleApiError } from "@/lib/errors";
import * as reportsService from "@/modules/reports/service";

async function handler(
  request: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const url = new URL(request.url);
    const format = url.searchParams.get("format") ?? "csv";
    const program = url.searchParams.get("program") ?? undefined;
    const semester = url.searchParams.get("semester");
    const data = await reportsService.generateAcademicReport({
      program,
      semester: semester ? Number(semester) : undefined,
    });
    const rows = (data.scores as { student?: { user?: { firstName?: string; lastName?: string }; regNumber?: string }; course?: { code?: string; title?: string }; score?: number; letterGrade?: string; assessmentType?: string; semester?: number }[]).map((s) => ({
      Student: s.student ? `${s.student.user?.firstName} ${s.student.user?.lastName}` : "",
      "REG No": (s.student as { regNumber?: string })?.regNumber ?? "",
      Course: s.course?.code ?? "",
      "Course Title": s.course?.title ?? "",
      Score: s.score ?? "",
      Grade: s.letterGrade ?? "",
      "Assessment Type": s.assessmentType ?? "",
      Semester: s.semester ?? "",
    }));
    const csv = reportsService.exportToCsv(rows, "academic-report.csv");
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=academic-report.csv",
      },
    });
  } catch (e) {
    return handleApiError(e, "reports/academic/export");
  }
}

export const GET = withAuth(handler, "MANAGEMENT");
