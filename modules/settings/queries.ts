import prisma from "@/lib/prisma";

export async function getSetting(key: string) {
  const s = await prisma.systemSetting.findUnique({
    where: { key },
  });
  return s?.value ?? null;
}

export async function getSettings(keys: string[]) {
  const settings = await prisma.systemSetting.findMany({
    where: { key: { in: keys } },
  });
  const out: Record<string, string> = {};
  for (const s of settings) out[s.key] = s.value;
  return out;
}

export async function getAllSettings() {
  const list = await prisma.systemSetting.findMany();
  const out: Record<string, string> = {};
  for (const s of list) out[s.key] = s.value;
  return out;
}

export async function updateSetting(key: string, value: string) {
  return prisma.systemSetting.upsert({
    where: { key },
    create: { key, value },
    update: { value },
  });
}

export async function updateMultipleSettings(settings: { key: string; value: string }[]) {
  for (const { key, value } of settings) {
    await prisma.systemSetting.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    });
  }
}
