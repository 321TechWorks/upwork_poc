import { api } from "@pp/trpc/server";
import { type Pet } from "@pp/domain/pet";
import { type Certificate } from "@pp/domain/certificate";
import { type License } from "@pp/domain/license";
import { type Owner } from "@pp/domain/owner";
import { redirect } from "next/navigation";

export async function useLicense(licenseId?: string): Promise<{
  license: License | null;
  pet: Pet | null;
  owner: Owner | null;
  certificate: Certificate | null;
}> {
  if (!licenseId) {
  }

  if (licenseId) {
    const license = await api.license.getLicensesById({
      id: parseInt(licenseId),
    });

    if (!license) {
      redirect("/404");
    }

    return { ...license, license };
  }

  return {
    license: null,
    pet: null,
    owner: null,
    certificate: null,
  };
}
