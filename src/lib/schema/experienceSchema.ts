import { z } from "zod";

export const experienceSchema = z.object({
  id: z.string().cuid(),
  company: z.string().min(2, "Company name is required"),
  role: z.string().min(2, "Role is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters"),
});
export type ExperienceSchema = z.infer<typeof experienceSchema>;
