import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@pp/server/api/trpc";
import { ownerSchema } from "@pp/domain/owner";
import { petSchema } from "@pp/domain/pet";
import { certificateSchema } from "@pp/domain/certificate";
import { pets, owners, certificates, licenses } from "@pp/server/db/schema";

export const licenseRouter = createTRPCRouter({
  createLicense: protectedProcedure
    .input(
      z.object({
        owner: ownerSchema,
        pet: petSchema,
        certificate: certificateSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [petResult, ownerResult, certificateResult] = await Promise.all([
        ctx.db.insert(pets).values(input.pet),
        ctx.db.insert(owners).values(input.owner),
        ctx.db.insert(certificates).values(input.certificate),
      ]);

      return ctx.db.insert(licenses).values({
        petId: petResult[0].insertId,
        ownerId: ownerResult[0].insertId,
        certificateId: certificateResult[0].insertId,
      });
    }),
  getLicensesByOwner: protectedProcedure
    .input(z.object({ ownerId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.query.licenses.findFirst({
        where: (licenses, { eq }) =>
          eq(licenses.ownerId, parseInt(input.ownerId)),
        with: {
          pet: true,
          certificate: true,
        },
      });
    }),
});
