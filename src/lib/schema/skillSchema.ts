import { z } from "zod";
export const skillSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
});
export type SkillSchema = z.infer<typeof skillSchema>;
