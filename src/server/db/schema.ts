import {
  bigint,
  int,
  mysqlTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { relations } from "drizzle-orm";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator((name) => `pet_parent_${name}`);

export const licenses = createTable("license", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  petId: bigint("petId", { mode: "number" })
    .notNull()
    .references(() => pets.id),
  ownerId: bigint("ownerId", { mode: "number" })
    .notNull()
    .references(() => owners.id),
  certificateId: bigint("certificateId", { mode: "number" })
    .notNull()
    .references(() => certificates.id),
});

export const licensePetRelations = relations(licenses, ({ one }) => ({
  pet: one(pets, {
    fields: [licenses.petId],
    references: [pets.id],
  }),
}));

export const licenseCertificateRelations = relations(licenses, ({ one }) => ({
  certificate: one(certificates, {
    fields: [licenses.certificateId],
    references: [certificates.id],
  }),
}));

export const pets = createTable("pet", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  type: varchar("type", {
    length: 256,
    // enum: petSchema.shape.type.options.map((o) => o.value),
  }).notNull(),
  weight: varchar("weight", { length: 256 }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  color: varchar("color", { length: 256 }).notNull(),
  gender: varchar("gender", { length: 256 }).notNull(),
  microchipTagNumber: varchar("microchipTagNumber", { length: 256 }).notNull(),
  dateOfBirth: timestamp("dateOfBirth").notNull(),
  waivedIssuedDate: timestamp("waivedIssuedDate").notNull(),
});

export const owners = createTable("owner", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }).notNull(),
});

export const certificates = createTable("certificate", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  rabiesVaccinationDate: timestamp("rabiesVaccinationDate").notNull(),
  rabiesVaccinationDuration: int("rabiesVaccinationDuration").notNull(),
  vetFacilityName: varchar("vetFacilityName", { length: 256 }).notNull(),
  vaccineProducer: varchar("vaccineProducer", { length: 256 }),
  vaccineLot: varchar("vaccineLot", { length: 256 }),
  vaccineSerial: varchar("vaccineSerial", { length: 256 }),
  vaccineLotExperiation: timestamp("vaccineLotExperiation"),
});
