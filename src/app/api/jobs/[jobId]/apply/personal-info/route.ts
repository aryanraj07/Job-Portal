import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { personalInfoSchema } from "@/lib/jobPortalSchema";
import prisma from "@/lib/prisma";
import { success } from "zod";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> },
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthenticated user",
        },
        { status: 401 },
      );
    }
    const body = await req.json();
    const result = personalInfoSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          errors: result.error.flatten(),
        },
        { status: 400 },
      );
    }
    const { jobId } = await params;
    const validatedData = personalInfoSchema.safeParse(body);
    if (!validatedData) {
      return NextResponse.json(
        { success: false, message: "Valid details not found" },
        { status: 400 },
      );
    }
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...validatedData,
      },
    });
    await prisma.jobApplication.upsert({
      where: {
        userId_jobId: {
          userId,
          jobId,
        },
      },
      create: {
        userId,
        jobId,
        currentStep: 1,
      },
      update: {
        currentStep: 1,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Personal info saved",
    });
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
