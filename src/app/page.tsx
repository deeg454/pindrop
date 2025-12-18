import { auth } from "@clerk/nextjs/server";
import { ensureUser } from "@/lib/user";
import { Menu } from "@/components/menu";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    await ensureUser();
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      Landing page
      <Menu />  
    </div>
  );
}
