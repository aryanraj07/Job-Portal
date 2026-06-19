"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createJobSchema, CreateJobFormData } from "@/lib/jobPortalSchema";

export default function CreateJobPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateJobFormData>({
    resolver: zodResolver(createJobSchema),

    defaultValues: {
      title: "",
      company: "",
      location: "",
      description: "",
      employmentType: "FULL_TIME",
      experienceMin: 0,
      experienceMax: 0,
      salaryMin: 0,
      salaryMax: 0,
    },
  });

  const onSubmit = async (data: CreateJobFormData) => {
    try {
      const res = await fetch("/api/admin/jobs", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      alert("Job created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-8">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="mb-8 text-3xl font-bold">Create Job</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}

          <div>
            <label className="mb-2 block font-medium">Job Title</label>

            <input
              {...register("title")}
              className="w-full rounded-xl border p-3"
              placeholder="Frontend Developer"
            />

            <p className="mt-1 text-sm text-red-500">{errors.title?.message}</p>
          </div>

          {/* Company */}

          <div>
            <label className="mb-2 block font-medium">Company</label>

            <input
              {...register("company")}
              className="w-full rounded-xl border p-3"
              placeholder="Google"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.company?.message}
            </p>
          </div>

          {/* Location */}

          <div>
            <label className="mb-2 block font-medium">Location</label>

            <input
              {...register("location")}
              className="w-full rounded-xl border p-3"
              placeholder="Noida"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.location?.message}
            </p>
          </div>

          {/* Employment Type */}

          <div>
            <label className="mb-2 block font-medium">Employment Type</label>

            <select
              {...register("employmentType")}
              className="w-full rounded-xl border p-3"
            >
              <option value="FULL_TIME">Full Time</option>

              <option value="PART_TIME">Part Time</option>

              <option value="INTERNSHIP">Internship</option>

              <option value="CONTRACT">Contract</option>
            </select>
          </div>

          {/* Experience */}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">Min Experience</label>

              <input
                type="number"
                {...register("experienceMin")}
                className="w-full rounded-xl border p-3"
              />

              <p className="mt-1 text-sm text-red-500">
                {errors.experienceMin?.message}
              </p>
            </div>

            <div>
              <label className="mb-2 block font-medium">Max Experience</label>

              <input
                type="number"
                {...register("experienceMax")}
                className="w-full rounded-xl border p-3"
              />

              <p className="mt-1 text-sm text-red-500">
                {errors.experienceMax?.message}
              </p>
            </div>
          </div>

          {/* Salary */}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">Salary Min</label>

              <input
                type="number"
                {...register("salaryMin")}
                className="w-full rounded-xl border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Salary Max</label>

              <input
                type="number"
                {...register("salaryMax")}
                className="w-full rounded-xl border p-3"
              />
            </div>
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block font-medium">Job Description</label>

            <textarea
              rows={10}
              {...register("description")}
              className="w-full rounded-xl border p-3"
              placeholder="Write complete JD..."
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.description?.message}
            </p>
          </div>

          {/* Submit */}

          <button
            disabled={isSubmitting}
            className="rounded-xl bg-black px-6 py-3 text-white"
          >
            {isSubmitting ? "Creating..." : "Create Job"}
          </button>
        </form>
      </div>
    </div>
  );
}
