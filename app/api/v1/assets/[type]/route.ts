import { NextRequest } from "next/server";
import { notFoundResponse } from "@/lib/response";
import { withAuth } from "@/lib/middleware";
import * as assetsService from "@/modules/assets/service";
import { readFile } from "fs/promises";
import { join } from "path";

const ASSET_DIR = join(process.cwd(), "public", "assets");

export async function GET(
  _request: NextRequest,
  context: { params?: Promise<Record<string, string>> }
) {
  const params = await context.params;
  const type = params?.type;
  if (!type) return notFoundResponse("Asset");
  const asset = await assetsService.getAsset(type as Parameters<typeof assetsService.getAsset>[0]);
  if (!asset) {
    const fallbacks: Record<string, string> = {
      logo: "logo.png",
      "logo-white": "logo-white.png",
      "logo-dark": "logo-dark.png",
      favicon: "favicon.ico",
      "favicon-32": "favicon-32.png",
      "favicon-16": "favicon-16.png",
      "og-image": "og-image.png",
    };
    const file = fallbacks[type] ?? type;
    try {
      const path = join(ASSET_DIR, file);
      const buf = await readFile(path);
      const mime = type.includes("favicon") && file.endsWith(".ico") ? "image/x-icon" : "image/png";
      return new Response(buf, {
        headers: {
          "Content-Type": mime,
          "Cache-Control": "public, max-age=86400",
        },
      });
    } catch {
      return notFoundResponse("Asset");
    }
  }
  if (asset.url.startsWith("/")) {
    try {
      const path = join(process.cwd(), "public", asset.url);
      const buf = await readFile(path);
      return new Response(buf, {
        headers: {
          "Content-Type": asset.mimeType,
          "Cache-Control": "public, max-age=86400",
        },
      });
    } catch {
      return notFoundResponse("Asset");
    }
  }
  return Response.redirect(asset.url, 302);
}

async function putHandler(
  request: NextRequest,
  context: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  const params = await context.params;
  const type = params?.type;
  if (!type) return notFoundResponse("Asset");
  return Response.json({ message: "Asset update not implemented in this build" }, { status: 501 });
}

export const PUT = withAuth(putHandler, "MANAGEMENT");
