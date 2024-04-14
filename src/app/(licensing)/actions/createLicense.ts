"use server";

import { api } from "@pp/trpc/server";
import { getServerAuthSession } from "@pp/server/auth";
import { type Certificate } from "@pp/domain/certificate";
import { type Pet } from "@pp/domain/pet";

export async function createLicense([pet, certificate]: [
  pet: Pet,
  certificate: Certificate,
]) {
  const session = await getServerAuthSession();
  await api.license.createLicense({
    pet,
    certificate,
    owner: {
      name: session?.user.name ?? "TEST",
    },
  });
}
