import { getAdminUser } from "@/lib/getAdminUser";
import { createJobSchema } from "@/lib/jobPortalSchema";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> },
) {
  await getAdminUser();

  const { jobId } = await params;

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

  const job = await prisma.job.update({
    where: {
      id: jobId,
    },
    data: result.data,
  });

  return NextResponse.json({
    success: true,
    data: job,
  });
}
