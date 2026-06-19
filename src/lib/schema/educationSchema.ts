import { cuid, z } from "zod";

export const educationSchema = z.object({
  id: z.string().cuid(),
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
export type EducationSchema = z.infer<typeof educationSchema>;
