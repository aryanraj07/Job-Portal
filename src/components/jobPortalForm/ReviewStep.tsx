"use client";

import { useApplicationStore } from "@/app/store/useApplicationStore";
import { EducationSchema } from "@/lib/schema/educationSchema";
import { ExperienceSchema } from "@/lib/schema/experienceSchema";
import { SkillSchema } from "@/lib/schema/skillSchema";

interface Props {
  onEdit: (step: number) => void;
  education: EducationSchema[];
  experience: ExperienceSchema[];
  skills: SkillSchema[];
}
export default function ReviewStep({
  onEdit,
  education,
  experience,
  skills,
}: Props) {
  const { personalData, resumeUrl, portfolio } = useApplicationStore();
  return (
    <div className="space-y-6">
      <section className="rounded-xl border p-5">
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold">Personal Information</h3>

          <button type="button" onClick={() => onEdit(1)}>
            Edit
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <p>
            <strong>Name:</strong> {personalData.firstName}{" "}
            {personalData.lastName}
          </p>

          <p>
            <strong>Email:</strong> {personalData.email}
          </p>

          <p>
            <strong>Phone:</strong> {personalData.phoneNumber}
          </p>

          <p>
            <strong>Location:</strong> {personalData.location}
          </p>
        </div>
      </section>
      <section className="rounded-xl border p-5">
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold">Education</h3>

          <button type="button" onClick={() => onEdit(2)}>
            Edit
          </button>
        </div>

        <div className="space-y-4">
          {education.map((item) => (
            <div key={item.id} className="rounded-lg bg-slate-50 p-4">
              <p>
                <strong>College:</strong> {item.college}
              </p>

              <p>
                <strong>Degree:</strong> {item.degree}
              </p>

              <p>
                <strong>CGPA:</strong> {item.cgpa}
              </p>

              <p>
                <strong>Passing Year:</strong> {item.endDate}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border p-5">
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold">Experience</h3>

          <button type="button" onClick={() => onEdit(3)}>
            Edit
          </button>
        </div>

        <div className="space-y-4">
          {experience.map((item) => (
            <div key={item?.id} className="rounded-lg bg-slate-50 p-4">
              <p>
                <strong>Company:</strong> {item.company}
              </p>

              <p>
                <strong>Role:</strong> {item.role}
              </p>

              <p>
                <strong>Duration:</strong> {item.startDate} - {item.endDate}
              </p>

              <p>
                <strong>Description:</strong> {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-xl border p-5">
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold">Skills</h3>

          <button type="button" onClick={() => onEdit(4)}>
            Edit
          </button>
        </div>

        <section className="rounded-xl border p-5">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Skills</h3>

            <button type="button" onClick={() => onEdit(4)}>
              Edit
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="rounded-full border px-3 py-1">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
        <section className="rounded-xl border p-5">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Resume</h3>

            <button type="button" onClick={() => onEdit(5)}>
              Edit
            </button>
          </div>

          <p>{resumeUrl}</p>
        </section>
        <section className="rounded-xl border p-5">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Portfolio</h3>

            <button type="button" onClick={() => onEdit(6)}>
              Edit
            </button>
          </div>

          <p>{portfolio.githubUrl}</p>
          <p>{portfolio.portfolioUrl}</p>
          <p>{portfolio.linkedInUrl}</p>
        </section>
      </section>
      <button
        type="button"
        className="w-full rounded-xl bg-black text-white py-4"
      >
        Submit Application
      </button>
    </div>
  );
}
