import * as settingsService from "@/modules/settings/service";

export type AssetType =
  | "logo"
  | "logo-white"
  | "logo-dark"
  | "favicon"
  | "favicon-32"
  | "favicon-16"
  | "og-image"
  | "banner";

const ASSET_KEYS: Record<string, string> = {
  logo: "asset_logo",
  "logo-white": "asset_logo_white",
  "logo-dark": "asset_logo_dark",
  favicon: "asset_favicon",
  "favicon-32": "asset_favicon_32",
  "favicon-16": "asset_favicon_16",
  "og-image": "asset_og_image",
  banner: "asset_banner",
};

export async function getAsset(type: AssetType) {
  const key = ASSET_KEYS[type] ?? type;
  const path = await settingsService.getSetting(key);
  if (!path) return null;
  const mime =
    path.endsWith(".png")
      ? "image/png"
      : path.endsWith(".ico")
        ? "image/x-icon"
        : path.endsWith(".jpg") || path.endsWith(".jpeg")
          ? "image/jpeg"
          : "application/octet-stream";
  return { url: path, mimeType: mime };
}

export async function getAllAssets() {
  const settings = await settingsService.getAllSettings();
  const out: Record<string, { url: string }> = {};
  for (const [type, key] of Object.entries(ASSET_KEYS)) {
    if (settings[key]) out[type] = { url: settings[key] };
  }
  return out;
}
