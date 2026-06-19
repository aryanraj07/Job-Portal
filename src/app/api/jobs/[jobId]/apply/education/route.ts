import { NextRequest, NextResponse } from "next/server";

import { educationPayloadSchema, educationSchema } from "@/lib/jobPortalSchema";
import prisma from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> },
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthenticated user",
        },
        { status: 401 },
      );
    }
    const { jobId } = await params;
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) {
      return NextResponse.json(
        {
          success: false,
          message: "Job not found",
        },
        { status: 404 },
      );
    }
    const body = await req.json();
    const result = educationPayloadSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          errors: result.error.flatten(),
        },
        { status: 400 },
      );
    }
    const { applicationId, educationIds } = result.data;
    const application = await prisma.jobApplication.findFirst({
      where: {
        id: applicationId,
        userId: user?.id,
      },
    });
    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message: "Application not found",
        },
        { status: 404 },
      );
    }
    await prisma.$transaction(async (tx) => {
      await tx.applicationEducation.deleteMany({ where: { applicationId } });
      await tx.applicationEducation.createMany({
        data: educationIds.map((educationId) => ({
          applicationId,
          educationId,
        })),
      });
      await tx.jobApplication.update({
        where: {
          id: applicationId,
        },
        data: {
          currentStep: 3,
        },
      });
    });
    return NextResponse.json({
      success: true,
      message: "Education saved",
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
