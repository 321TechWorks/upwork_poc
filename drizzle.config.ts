import { type Config } from "drizzle-kit";

import { env } from "@pp/env";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    uri: env.DATABASE_URL,
  },
  tablesFilter: ["pet_parent_*"],
} satisfies Config;
