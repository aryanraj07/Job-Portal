import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const users = await prisma.user.findMany();
  console.log("users", users);

  const clerkUser = await currentUser();

  console.log("CLERK USER:", {
    id: clerkUser?.id,
    email: clerkUser?.emailAddresses?.[0]?.emailAddress,
    firstName: clerkUser?.firstName,
    lastName: clerkUser?.lastName,
  });
  //
  return <></>;
}
