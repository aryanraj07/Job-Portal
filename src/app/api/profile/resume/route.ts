import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";
import prisma from "@/lib/prisma";
import uploadToCloudinary from "@/utils/uploadCloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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
    const formData = await req.formData();
    const resume = formData.get("resume") as File;
    const bytes = await resume.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadResult = await uploadToCloudinary(buffer);

    const resumeUrl = await uploadResult.secure_url;
  } catch (err) {}
}
