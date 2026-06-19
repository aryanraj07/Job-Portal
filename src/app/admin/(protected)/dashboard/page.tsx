// app/admin/dashboard/jobs/page.tsx

import prisma from "@/lib/prisma";
import JobsTable from "@/components/admin/JobsTable";

export default async function JobsPage() {
  const jobs = await prisma.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          application: true,
        },
      },
    },
  });

  return <JobsTable jobs={jobs} />;
}
