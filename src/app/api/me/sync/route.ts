// app/api/me/sync/route.ts

import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return Response.json({ success: false }, { status: 401 });
  }
  const existingUser = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
  });
  if (existingUser) {
    return Response.json({
      success: true,
      alreadyExists: true,
    });
  }

  await prisma.user.create({
    data: {
      clerkId: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
    },
  });

  return Response.json({ success: true });
}
