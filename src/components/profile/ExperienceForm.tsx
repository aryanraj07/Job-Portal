"use client";

import { ExperienceItem, experienceSchema } from "@/lib/jobPortalSchema";
import { useForm } from "react-hook-form";
import FormField from "../common/FormField";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ExperienceForm() {
  const {
    register,
    formState: { errors, isValid },
  } = useForm<ExperienceItem>({ resolver: zodResolver(experienceSchema) });
  return (
    <div>
      <div>
        <FormField label="Company" error={errors?.company?.message}>
          <input
            {...register(`company`)}
            className="w-full rounded-xl border p-3"
          />
        </FormField>

        <FormField label="Role" error={errors?.role?.message}>
          <input
            {...register(`role`)}
            className="w-full rounded-xl border p-3"
          />
        </FormField>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField label="Start Date" error={errors?.startDate?.message}>
            <input
              type="date"
              {...register(`startDate`)}
              className="w-full rounded-xl border p-3"
            />
          </FormField>

          <FormField label="End Date" error={errors?.endDate?.message}>
            <input
              type="date"
              {...register(`endDate`)}
              className="w-full rounded-xl border p-3"
            />
          </FormField>
        </div>

        <FormField label="Description" error={errors?.description?.message}>
          <textarea
            rows={4}
            {...register(`description`)}
            className="w-full rounded-xl border p-3"
          />
        </FormField>
      </div>
    </div>
  );
}
