import { z } from "zod";

// Step 1: Personal Information
export const personalInfoSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  location: z.string().min(2, "Location is required"),
  linkedIn: z.url("Invalid LinkedIn URL"),
});
// Step 2: Education
export const educationSchema = z.object({
  college: z.string().min(2, "College name is required"),
  degree: z.string().min(2, "Degree is required"),
  cgpa: z
    .number()
    .min(0, "CGPA cannot be less than 0")
    .max(10, "CGPA cannot exceed 10"),
  isCurrentlyStudying: z.boolean().default(false),
  startDate: z.string(),
  endDate: z.string().optional(),
});
// Step 3: Experience
export const experienceSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  role: z.string().min(2, "Role is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters"),
});
export const educationSelectionSchema = z.object({
  educationIds: z.array(z.string()).min(1, "Select at least one education"),
});
export const educationPayloadSchema = educationSelectionSchema.extend({
  applicationId: z.string().cuid(),
});

export type EducationFormData = z.infer<typeof educationSelectionSchema>;
export const experienceStepSchema = z.object({
  experience: z.array(experienceSchema),
});
// export const educationStepSchema = z.object({
//   education: z.array(educationSchema),
// });
export const experienceSelectionSchema = z.object({
  experienceIds: z.array(z.string()).min(1, "Select at least one experience"),
});

export type ExperienceFormData = z.infer<typeof experienceSelectionSchema>;
export type EducationPayload = z.infer<typeof educationPayloadSchema>;
export const experiencePayloadSchema = experienceSelectionSchema.extend({
  applicationId: z.string().cuid(),
});
export type ExperiencePayload = z.infer<typeof educationPayloadSchema>;
// Step 4: Skills
export const skillsSchema = z.object({
  skills: z.array(z.string()).min(1, "Add at least one skill"),
});

export const skillsSelectionSchema = z.object({
  skillIds: z.array(z.string()).min(1, "Select at least one skill"),
});
export const skillPayloadSchema = skillsSelectionSchema.extend({
  applicationId: z.string().cuid(),
});
export type SkillPayload = z.infer<typeof educationPayloadSchema>;
// Step 4: Skills
// export type SkillsFormData = z.infer<typeof skillsSelectionSchema>;
// Step 5: Resume Upload
export const resumeSchema = z.object({
  resume: z
    .instanceof(File, {
      message: "Resume is required",
    })
    .refine(
      (file) =>
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      "Only PDF or Word documents are allowed",
    ),
});
export const resumePayloadSchema = resumeSchema.extend({
  applicationId: z.string().cuid(),
});
export type ResumePayload = z.infer<typeof resumePayloadSchema>;
// Step 6: Portfolio
export const portfolioSchema = z.object({
  github: z.url("Invalid GitHub URL"),
  portfolio: z.url("Invalid Portfolio URL"),
  linkedIn: z.url("Invalid LinkedIn URL"),
});
export const portfolioPayloadSchema = portfolioSchema.extend({
  applicationId: z.string().cuid(),
});
export type PortfolioPayload = z.infer<typeof portfolioPayloadSchema>;
// Complete Application Schema
export const applicationSchema = z.object({
  // Step 1
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().min(10),
  dateOfBirth: z.string(),
  location: z.string().min(2),
  personalLinkedIn: z.url(),

  // Step 2
  college: z.string().min(2),
  degree: z.string().min(2),
  cgpa: z.number().min(0).max(10),
  passingYear: z.number(),

  // Step 3
  experience: z.array(
    z.object({
      company: z.string().min(2),
      role: z.string().min(2),
      startDate: z.string(),
      endDate: z.string().optional(),
      description: z.string().min(10),
    }),
  ),

  // Step 4
  skills: z.array(z.string()).min(1),

  // Step 5
  resume: z.instanceof(File),

  // Step 6
  github: z.url(),
  portfolio: z.url(),
  portfolioLinkedIn: z.url(),
});

//create job schema

export const createJobSchema = z.object({
  title: z.string().min(3),

  company: z.string().min(2),

  description: z.string().min(20),

  location: z.string().optional(),

  salaryMin: z.number().optional(),

  salaryMax: z.number().optional(),

  experienceMin: z.number().optional(),

  experienceMax: z.number().optional(),
  //

  employmentType: z.enum(["FULL_TIME", "PART_TIME", "INTERNSHIP", "CONTRACT"]),
});
export type CreateJobFormData = z.infer<typeof createJobSchema>;
export type SkillsFormData = z.infer<typeof skillsSelectionSchema>;
export type ApplicationFormData = z.infer<typeof applicationSchema>;
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type EducationItem = z.infer<typeof educationSchema>;
export type ProfileEducationFormData = z.input<typeof educationSchema>;
export type ProfileExperienceFormData = z.infer<typeof experienceStepSchema>;
export type ExperienceItem = z.infer<typeof experienceSchema>;
export type SkillItem = z.infer<typeof skillsSchema>;
export type ResumeFormData = z.infer<typeof resumeSchema>;
export type PortfolioFormData = z.infer<typeof portfolioSchema>;
//
