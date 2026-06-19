"use client";

import Link from "next/link";

interface JobsTableProps {
  jobs: any[];
}

export default function JobsTable({ jobs }: JobsTableProps) {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Jobs</h1>

          <p className="text-gray-500">Manage all job postings</p>
        </div>

        <Link
          href="/admin/dashboard/jobs/create-job"
          className="rounded-xl bg-black px-5 py-3 text-white"
        >
          Create Job
        </Link>
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl border bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-6 py-4 text-left">Job</th>

              <th className="px-6 py-4 text-left">Company</th>

              <th className="px-6 py-4 text-left">Status</th>

              <th className="px-6 py-4 text-left">Applications</th>

              <th className="px-6 py-4 text-left">Created</th>

              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-5">
                  <div className="font-medium">{job.title}</div>
                </td>

                <td className="px-6 py-5">{job.company}</td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      job.status === "OPEN"
                        ? "bg-green-100 text-green-700"
                        : job.status === "DRAFT"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </td>

                <td className="px-6 py-5">{job._count.application}</td>

                <td className="px-6 py-5">
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/dashboard/jobs/${job.id}/edit`}
                      className="rounded-lg border px-3 py-2"
                    >
                      Edit
                    </Link>

                    <button className="rounded-lg border px-3 py-2">
                      Toggle
                    </button>

                    <Link
                      href={`/admin/dashboard/jobs/${job.id}/applications`}
                      className="rounded-lg border px-3 py-2"
                    >
                      Applicants
                    </Link>
                  </div>
                </td>
              </tr>
            ))}

            {jobs.length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-500">
                  No jobs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
