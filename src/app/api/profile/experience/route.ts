import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";
import { experienceSchema } from "@/lib/jobPortalSchema";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not authenticated",
        },
        {
          status: 401,
        },
      );
    }

    const body = await req.json();

    const result = experienceSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    const { company, role, startDate } = result.data;

    await prisma.experience.upsert({
      where: {
        userId_company_startDate_role: {
          userId: user.id,
          company,
          role,
          startDate,
        },
      },
      create: {
        ...result.data,
        userId: user.id,
      },
      update: {
        ...result.data,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Experience saved successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
