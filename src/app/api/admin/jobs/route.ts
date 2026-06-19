import { getAdminUser } from "@/lib/getAdminUser";
import { createJobSchema } from "@/lib/jobPortalSchema";
import prisma from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";
import {
  ForbiddenError,
  UnauthorizedError,
  UserNotFoundError,
} from "../../../../../errors";

export async function POST(req: NextRequest) {
  try {
    const user = await getAdminUser();

    const body = await req.json();

    const result = createJobSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten(),
        },
        { status: 400 },
      );
    }
    const job = await prisma.job.create({
      data: {
        ...result.data,

        status: "OPEN",

        createdById: user.id,
      },
    });
    return NextResponse.json(
      {
        success: true,
        data: job,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (error instanceof ForbiddenError) {
      return new Response("Forbidden", { status: 403 });
    }

    if (error instanceof UserNotFoundError) {
      return new Response("User not found", { status: 404 });
    }

    return new Response("Internal Server Error", { status: 500 });
  }
}
