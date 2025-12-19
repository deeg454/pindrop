"use server"

import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/packages/db";
import { users } from "@/packages/db/schema";
import { eq } from "drizzle-orm";

export async function ensureUser() {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) throw new Error("Unauthorized");

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, clerkUserId))
    .get();

  if (existing) return existing;

  
  const client = await clerkClient();
  const clerkUser = await client.users.getUser(clerkUserId);

  const userName =
    clerkUser.username ??
    clerkUser.firstName ??
    `user_${clerkUserId.slice(-6)}`;

  const profileImageUrl =
    clerkUser.imageUrl ??
    "https://your-app.com/default-avatar.png";

  const [user] = await db
    .insert(users)
    .values({
      clerkUserId,
      userName,
      profileImageUrl,
    })
    .returning();

  return user;
}

export async function getUserID(){
  const user = await ensureUser();
  return String(user.userId);
}