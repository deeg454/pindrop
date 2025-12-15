import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
	path: "../../.env",
});

export default defineConfig({
  schema: "packages/db/schema.ts",
  out: "packages/db/drizzle",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
});