import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";
import prisma from "@/lib/prisma";
import uploadToCloudinary from "@/utils/uploadCloudinary";
import { NextRequest, NextResponse } from "next/server";

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
    const { applicationId, resumeId } = body;

    const application = await prisma.jobApplication.findFirst({
      where: {
        id: applicationId,
        userId: user?.id,
        jobId,
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

    await prisma.jobApplication.update({
      where: {
        id: applicationId,
      },
      data: {
        resumeId,
        currentStep: 6,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Resume saved",
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
