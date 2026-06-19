"use client";

import { useApplicationStore } from "@/app/store/useApplicationStore";
import {
  EducationFormData,
  EducationItem,
  educationSelectionSchema,
} from "@/lib/jobPortalSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
export type ProfileEducation = EducationItem & {
  id: string;
};
export default function EducationStep({
  profileEducations,
}: {
  profileEducations: ProfileEducation[];
}) {
  const router = useRouter();
  const [showEducationModal, setShowEducationModal] = useState(false);
  const selectedEducationIds = useApplicationStore((state) => state.education);
  const form = useForm<EducationFormData>({
    resolver: zodResolver(educationSelectionSchema),
    defaultValues: {
      educationIds: selectedEducationIds,
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = form;
  const selected = watch("educationIds");
  return (
    <>
      <div className="space-y-4">
        {profileEducations.map((education) => (
          <label
            htmlFor={education.id}
            key={education.id}
            className="flex items-start gap-3 border rounded-xl p-4 cursor-pointer"
          >
            <input
              type="checkbox"
              value={education.id}
              {...register("educationIds")}
            />
            <div>
              <h4 className="font-medium">{education.degree}</h4>

              <p className="text-sm text-gray-500">{education.college}</p>
            </div>
          </label>
        ))}

        <button type="button" onClick={() => setShowEducationModal(true)}>
          + Add New Education
        </button>
      </div>
    </>
  );
}
