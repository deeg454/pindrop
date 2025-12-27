"use server";

import { db } from "@/packages/db";
import { posts } from "@/packages/db/schema";
import { ensureUser } from "../user";
import { isNotNull, and } from "drizzle-orm";


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

  await db.insert(posts).values({
    userId: user.userId,
    userName: user.userName,
    title,
    content,
    latitude,  
    longitude,  
  });
}


export async function fetchPosts(){
  const res = await db
  .select({
    user:posts.userName,
    lat: posts.latitude,
    lng: posts.longitude,
    content: posts.content,
    title: posts.title,
  })
  .from(posts).where(
    and(
      isNotNull(posts.latitude),
      isNotNull(posts.longitude),
      isNotNull(posts.content)
    )
  );
  return res
}

