import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { Webhook } from "svix";
export async function POST(req: NextRequest) {
  const payload = await req.text();
  const headerPayload = await headers();

  const svixId = headerPayload.get("svix-id")!;
  const svixTimestamp = headerPayload.get("svix-timestamp")!;
  const svixSignature = headerPayload.get("svix-signature")!;
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  const evt = wh.verify(payload, {
    "svix-id": svixId,
    "svix-timestamp": svixTimestamp,
    "svix-signature": svixSignature,
  }) as any;
  if (evt.type === "user.created") {
    const user = evt.data;
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.email_addresses?.[0]?.email_address ?? "",
        name: `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim(),
      },
    });
  }
  if (evt.type === "user.updated") {
    const user = evt.data;

    await prisma.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        email: user.email_addresses?.[0]?.email_address ?? "",

        name: `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim(),
      },
    });
  }
  if (evt.type === "user.deleted") {
    await prisma.user.delete({
      where: {
        clerkId: evt.data.id,
      },
    });
  }
  return Response.json({ success: true });
  //   const payload = '{"test": 2432232314}';
}
