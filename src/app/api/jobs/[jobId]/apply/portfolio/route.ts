import { NextRequest, NextResponse } from "next/server";

import { portfolioPayloadSchema } from "@/lib/jobPortalSchema";
import prisma from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";

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
    const result = portfolioPayloadSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          errors: result.error.flatten(),
        },
        { status: 400 },
      );
    }
    const { applicationId, github, portfolio, linkedIn } = result.data;
    const application = await prisma.jobApplication.findFirst({
      where: {
        id: applicationId,
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
        githubUrl: github,
        linkedInUrl: linkedIn,
        portfolioUrl: portfolio,
        currentStep: 7,
      },
    });
    // validation
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
