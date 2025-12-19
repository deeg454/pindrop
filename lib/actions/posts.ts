"use server";

import { db } from "@/packages/db";
import { posts } from "@/packages/db/schema";
import { ensureUser } from "../user";

export async function createPost({
  title,
  content,
  latitude,
  longitude,
}: {
  title: string;
  content: string;
  latitude: number;
  longitude: number;
}) {
  const user = await ensureUser();

  const [post] = await db
    .insert(posts)
    .values({
      userId: user.userId,
      title,
      content,
      latitude: String(latitude),
      longitude: String(longitude),
    })
    .returning();
  return post;
}
