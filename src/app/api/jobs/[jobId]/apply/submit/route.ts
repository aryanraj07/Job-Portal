// user clicks submit

import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// then what will be the logic // like i need to just check if applicaiton exist or not and then
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> },
) {
  try {
    const userId = await getAuthenticatedUser();
    if (!userId) {
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
    if (job?.status !== "OPEN") {
      return NextResponse.json(
        {
          success: false,
          message: "Job is no longer accepting applications",
        },
        { status: 400 },
      );
    }
    const body = await req.json();
    const { applicationId } = body;
    const application = await prisma.jobApplication.findUnique({
      where: { id: applicationId },
      include: {
        selectedEducations: true,
        selectedExperiences: true,
        selectedSkills: true,
        resume: true,
      },
    });
    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message: "Application not  found",
        },
        { status: 404 },
      );
    }
    if (application.selectedEducations.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Education is required",
        },
        { status: 400 },
      );
    }
    if (application.selectedExperiences.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Experience is required",
        },
        { status: 400 },
      );
    }
    if (application.selectedSkills.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Skills are required",
        },
        { status: 400 },
      );
    }
    if (!application.resumeId) {
      return NextResponse.json(
        {
          success: false,
          message: "Resume is required",
        },
        { status: 400 },
      );
    }
    if (application.isSubmitted) {
      return NextResponse.json(
        {
          success: false,
          message: "Application already submitted",
        },
        { status: 400 },
      );
    }
    await prisma.jobApplication.update({
      where: {
        id: applicationId,
      },
      data: {
        isSubmitted: true,
        submittedAt: new Date(),
        currentStep: 7,
      },
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
