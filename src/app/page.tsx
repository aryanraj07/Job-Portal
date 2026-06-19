import prisma from "@/lib/prisma";

export default function Home() {
  const users = await prisma.user.findMany();
  console.log("users", users);

  return <></>;
}
