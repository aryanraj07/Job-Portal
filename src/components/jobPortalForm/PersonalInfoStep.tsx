"use client";
import {
  PersonalInfoFormData,
  personalInfoSchema,
} from "@/lib/jobPortalSchema";
import FormField from "../common/FormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  initialData?: {
    name?: string;
    email?: string;
    phone?: string;
    dateOfBirth?: string;
    location?: string;
    linkedIn?: string;
  };
  onNext?: (data: any) => Promise<void>;
}
export default function PersonalInfoStep({ initialData }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      dateOfBirth: initialData?.dateOfBirth || "",
      location: initialData?.location || "",
      linkedIn: initialData?.linkedIn || "",
    },
  });

  return (
    <form onSubmit={() => handleSubmit} className="space-y-5">
      <div>
        <FormField label="Company" error={errors.name?.message}>
          <input
            {...register("name")}
            className="w-full rounded-xl border p-3"
          />
        </FormField>
        <FormField label="Company" error={errors.name?.message}>
          <input
            {...register("email")}
            type="email"
            className="w-full rounded-xl border p-3"
          />
        </FormField>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          {...register("email")}
          className="w-full rounded-lg border p-3"
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <button
        disabled={!isValid}
        className="px-6 py-3 bg-black text-white rounded-lg disabled:opacity-50"
      >
        Save & Continue
      </button>
    </form>
  );
}
