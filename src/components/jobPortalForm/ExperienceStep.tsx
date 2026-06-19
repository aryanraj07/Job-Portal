"use client";

import { useApplicationStore } from "@/app/store/useApplicationStore";

import {
  ExperienceFormData,
  ExperienceItem,
  experienceSelectionSchema,
} from "@/lib/jobPortalSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
interface Props {
  experienceId?: string;
}
export type ProfileExperience = ExperienceItem & {
  id: string;
};
export default function ExperienceStep({
  profileExperiences,
}: {
  profileExperiences: ProfileExperience[];
}) {
  const [experienceModal, setShowExperienceModal] = useState(false);
  const selectedExperienceIds = useApplicationStore((s) => s.experience);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSelectionSchema),
    defaultValues: {
      experienceIds: selectedExperienceIds,
    },
  });

  return (
    <>
      <div className="space-y-4">
        {profileExperiences.map((experience) => (
          <label
            htmlFor={experience.id}
            key={experience.id}
            className="flex items-start gap-3 border rounded-xl p-4 cursor-pointer"
          >
            <input
              type="checkbox"
              value={experience.id}
              {...register("experienceIds")}
            />
            <div>
              <h4 className="font-medium">{experience.company}</h4>

              <p className="text-sm text-gray-500">{experience.role}</p>
            </div>
          </label>
        ))}

        <button type="button" onClick={() => setShowExperienceModal(true)}>
          + Add New experience
        </button>
      </div>
    </>
  );
}
