import { api } from "@pp/trpc/server";
import { type Pet } from "@pp/domain/pet";
import { type Certificate } from "@pp/domain/certificate";

export async function useLicense(
  licenseId?: string,
): Promise<[Pet | null, Certificate | null]> {
  // let pet: Pet | null = null;
  // let certificate: Certificate | null = null;

  if (licenseId) {
    const license = await api.license.getLicensesById({
      id: parseInt(licenseId),
    });

    return [license.pet, license.certificate];
  }

  return [null, null];
}
