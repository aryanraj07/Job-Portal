"use client";

import FormField from "@/components/common/FormField";
import { ResumeFormData } from "@/lib/jobPortalSchema";
import { useForm } from "react-hook-form";

export default function ResumeStep() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResumeFormData>();
  return (
    <FormField label="Upload Resume" error={errors.resume?.message}>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        {...register("resume")}
        className="w-full rounded-xl border p-3"
      />
    </FormField>
  );
}
