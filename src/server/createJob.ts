// import prisma from "@/lib/prisma";
// import { JobStatus } from "../../generated/prisma/client";

// interface CreateJobInput {
//   title: string;
//   company: string;
//   description: string;
//   status?: JobStatus;
// }

// export async function createJob(data: CreateJobInput) {
//   return prisma.job.create({
//     data: {
//       title: data.title,
//       company: data.company,
//       description: data.description,
//       status: data.status ?? "OPEN",
//     },
//   });
// }
