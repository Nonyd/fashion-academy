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
    const dateFrom = url.searchParams.get("dateFrom") ?? undefined;
    const dateTo = url.searchParams.get("dateTo") ?? undefined;
    const data = await reportsService.generateFinancialReport({ dateFrom, dateTo });
    const rows = (data.payments as { id?: string; amount?: number; purpose?: string; status?: string; provider?: string; createdAt?: string }[]).map((p) => ({
      ID: p.id ?? "",
      Amount: p.amount ?? "",
      Purpose: p.purpose ?? "",
      Status: p.status ?? "",
      Provider: p.provider ?? "",
      Date: p.createdAt ?? "",
    }));
    const csv = reportsService.exportToCsv(rows, "financial-report.csv");
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=financial-report.csv",
      },
    });
  } catch (e) {
    return handleApiError(e, "reports/financial/export");
  }
}

export const GET = withAuth(handler, "MANAGEMENT");
