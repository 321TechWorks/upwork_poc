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

  if (!session?.user.id) {
    throw Error("No user id in session");
  }

  return api.license.createLicense({
    pet,
    certificate,
    ownerId: parseInt(session.user.id),
  });
}
