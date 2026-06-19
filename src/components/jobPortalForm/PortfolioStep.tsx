"use client";

import FormField from "@/components/common/FormField";
import { PortfolioFormData } from "@/lib/jobPortalSchema";
import { useForm } from "react-hook-form";

export default function PortfolioStep({}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PortfolioFormData>();
  return (
    <div className="space-y-6">
      <FormField label="Github" error={errors.github?.message}>
        <input
          {...register("github")}
          className="w-full rounded-xl border p-3"
        />
      </FormField>

      <FormField label="Portfolio" error={errors.portfolio?.message}>
        <input
          {...register("portfolio")}
          className="w-full rounded-xl border p-3"
        />
      </FormField>

      <FormField label="LinkedIn" error={errors.linkedIn?.message}>
        <input
          {...register("linkedIn")}
          className="w-full rounded-xl border p-3"
        />
      </FormField>
    </div>
  );
}
