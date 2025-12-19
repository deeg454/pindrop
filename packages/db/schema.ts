import { sql } from "drizzle-orm";
import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable("posts", {
  postId: int("post_id").primaryKey({ autoIncrement: true }),
  userId: int("user_id").notNull().references(() => users.userId),
  title: text("title"),
  content: text("content"),
  latitude: text("latitude"),
  longitude: text("longitude"),
  createdAt: int("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const users = sqliteTable("users", {
  userId: int("user_id").primaryKey({ autoIncrement: true }),
  clerkUserId: text("clerk_id").notNull().unique(),
  userName: text("username").notNull().unique(),
  profileImageUrl: text("profile_image_url"),
  createdAt: int("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(current_timestamp)`),
});



