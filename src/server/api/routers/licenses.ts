import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@pp/server/api/trpc";
import { ownerSchema } from "@pp/domain/owner";
import { petSchema } from "@pp/domain/pet";
import { certificateSchema } from "@pp/domain/certificate";
import { pets, certificates, licenses } from "@pp/server/db/schema";
import { eq } from "drizzle-orm";

export const licenseRouter = createTRPCRouter({
  createLicense: protectedProcedure
    .input(
      z.object({
        ownerId: z.number(),
        pet: petSchema,
        certificate: certificateSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [petResult, certificateResult] = await Promise.all([
        ctx.db.insert(pets).values(input.pet),
        ctx.db.insert(certificates).values(input.certificate),
      ]);

      const created = await ctx.db.insert(licenses).values({
        ownerId: input.ownerId,
        petId: petResult[0].insertId,
        certificateId: certificateResult[0].insertId,
      });

      return { id: created[0].insertId };
    }),

  addToCart: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .update(licenses)
        .set({ status: "in cart" })
        .where(eq(licenses.id, input.id));
    }),

  //   .input(z.object({ ownerId: z.string() }))
  //   .query(({ input, ctx }) => {
  //     return ctx.db.query.licenses.findFirst({
  //       where: (licenses, { eq }) =>
  //         eq(licenses.ownerId, parseInt(input.ownerId)),
  //       with: {
  //         pet: true,
  //         certificate: true,
  //       },
  //     });
  //   }),
  getLicensesById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const licenseWithRelated = await ctx.db.query.licenses.findFirst({
        where: (licenses, { eq }) => eq(licenses.id, input.id),
        with: {
          owner: true,
          pet: true,
          certificate: true,
        },
      });

      if (!licenseWithRelated) return null;

      // there is a known bug in drizzle https://github.com/drizzle-team/drizzle-orm/issues/824
      return {
        ...licenseWithRelated,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        pet: petSchema.parse(licenseWithRelated?.pet),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        certificate: certificateSchema.parse(licenseWithRelated?.certificate),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        owner: ownerSchema.parse(licenseWithRelated?.owner),
      };
    }),

  getAllLicenses: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.licenses.findMany({
      with: {
        owner: true,
      },
    });
  }),
});
