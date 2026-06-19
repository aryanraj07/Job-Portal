import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";
import { educationSchema } from "@/lib/jobPortalSchema";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // check user
    // get education from body  and add
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not authenticated",
        },
        {
          status: 400,
        },
      );
    }
    const body = await req.json();

    const result = educationSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          errors: result.error.flatten(),
        },
        { status: 400 },
      );
    }
    const { college, degree, startDate } = result?.data;
    await prisma.education.upsert({
      where: {
        userId_college_degree_startDate: {
          userId: user.id,
          college,
          degree,
          startDate,
        },
      },
      create: {
        ...result.data,
        userId: user.id,
      },
      update: {
        ...result.data,
        userId: user.id,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Education saved successfully",
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
