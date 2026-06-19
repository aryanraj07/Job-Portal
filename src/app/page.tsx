import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const clerkUser = await currentUser();

  if (clerkUser) {
    const user = await prisma.user.upsert({
      where: {
        clerkId: clerkUser.id,
      },
      update: {},
      create: {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
        name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`,
      },
    });

    console.log("UPSERTED USER", user);
  }

  const users = await prisma.user.findMany();

  console.log("ALL USERS", users);

  return <div>Home</div>;
}
