import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const testTable = sqliteTable("test_table", {
  id: text("id").primaryKey(),
});
