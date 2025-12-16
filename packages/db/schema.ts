import { sql } from "drizzle-orm";
import { sqliteTable, text, int} from "drizzle-orm/sqlite-core";

export const testTable = sqliteTable("test_table", {
  id: text("id").primaryKey(),
});

export const users = sqliteTable("users", {
  userId: text("user_id").primaryKey(), // Clerk user ID
  userName: text("username").notNull().unique(),
  profileImageUrl: text("profile_image_url"),
  createdAt: int("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(current_timestamp)`),
});
