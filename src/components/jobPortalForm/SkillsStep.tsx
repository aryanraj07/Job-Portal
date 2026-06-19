"use client";

import { useApplicationStore } from "@/app/store/useApplicationStore";
import { SkillsFormData, skillsSelectionSchema } from "@/lib/jobPortalSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const skills = ["React", "Next.js", "Node.js", "MongoDB"];

export type ProfileSKills = {
  name: string;
  id: string;
};
export default function SkillsStep({
  profileSkills,
}: {
  profileSkills: ProfileSKills[];
}) {
  const store = useApplicationStore();
  // const [customSkill, setCustomSkill] = useState("");
  // const skillOptions = [
  //   "React",
  //   "Next.js",
  //   "TypeScript",
  //   "Node.js",
  //   "Express",
  //   "MongoDB",
  //   "PostgreSQL",
  //   "MySQL",
  //   "Redis",
  //   "Docker",
  //   "AWS",
  //   "Java",
  //   "Python",
  // ];
  const form = useForm<SkillsFormData>({
    resolver: zodResolver(skillsSelectionSchema),
    defaultValues: {
      skillIds: store.skills ?? [],
    },
  });
  const {
    watch,
    register,

    formState: { errors },
  } = form;

  const onSubmit = (data: SkillsFormData) => {};
  return (
    <>
      {profileSkills.map((skill) => (
        <label
          key={skill.id}
          className="flex items-center gap-3 rounded-xl border p-4"
        >
          <input type="checkbox" value={skill.id} {...register("skillIds")} />

          {skill.name}
        </label>
      ))}
    </>
  );
}
