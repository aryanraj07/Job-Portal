// lib/getAdminUser.ts

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  ForbiddenError,
  UnauthorizedError,
  UserNotFoundError,
} from "../../errors";

export async function getAdminUser() {
  const { userId } = await auth();
  if (!userId) {
    throw new UnauthorizedError();
  }
  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });
  if (!user) {
    throw new UserNotFoundError();
  }
  if (user.role !== "ADMIN") {
    throw new ForbiddenError();
  }
  return user;
}
