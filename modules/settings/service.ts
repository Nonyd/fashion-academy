const ALLOWED_KEYS = new Set([
  "academy_name",
  "academy_email",
  "academy_phone",
  "academy_address",
  "admissions_open",
  "current_intake",
  "application_fee",
  "application_fee_currency",
  "asset_logo",
  "asset_logo_white",
  "asset_logo_dark",
  "asset_favicon",
  "asset_favicon_32",
  "asset_favicon_16",
  "asset_og_image",
]);

const PUBLIC_KEYS = [
  "academy_name",
  "academy_email",
  "academy_phone",
  "academy_address",
  "admissions_open",
  "current_intake",
  "asset_logo",
  "asset_favicon",
];

import * as settingsQueries from "./queries";

export async function getSetting(key: string) {
  return settingsQueries.getSetting(key);
}

export async function getAllSettings() {
  return settingsQueries.getAllSettings();
}

export async function updateSetting(key: string, value: string) {
  if (!ALLOWED_KEYS.has(key)) throw new Error("Invalid setting key");
  await settingsQueries.updateSetting(key, value);
  return settingsQueries.getSetting(key);
}

export async function getPublicSettings() {
  const all = await settingsQueries.getSettings(PUBLIC_KEYS);
  return all;
}

export async function toggleAdmissions(isOpen: boolean) {
  await settingsQueries.updateSetting("admissions_open", isOpen ? "true" : "false");
}

export async function updateApplicationFee(amount: number, currency: string) {
  await settingsQueries.updateSetting("application_fee", String(amount));
  await settingsQueries.updateSetting("application_fee_currency", currency);
}

export async function updateMultipleSettings(settings: { key: string; value: string }[]) {
  for (const { key } of settings) {
    if (!ALLOWED_KEYS.has(key)) throw new Error(`Invalid setting key: ${key}`);
  }
  await settingsQueries.updateMultipleSettings(settings);
}
