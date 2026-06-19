import {
  EducationItem,
  ExperienceItem,
  SkillsFormData,
} from "@/lib/jobPortalSchema";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
interface PersonalData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  location: string;
  linkedInUrl: string;
}
export interface Experience extends ExperienceItem {
  id: string;
}
export interface Education extends EducationItem {
  id: string;
}

interface Portfolio {
  githubUrl: string;
  portfolioUrl: string;
  linkedInUrl: string;
}
interface ApplicationStore {
  currentStep: number;
  personalData: PersonalData;
  education: string[];
  experience: string[];
  skills: string[];
  resumeUrl: string;
  portfolio: Portfolio;
  lastCompletedStep: number;
  hydrated: boolean;
  stepLoading: boolean;
  setStepLoading: (isLoading: boolean) => void;
  canAccessStep: (targetStep: number) => boolean;

  // setCurrentStep: (step: number) => void;
  reset: () => void;
}

export const useApplicationStore = create<ApplicationStore>()(
  persist(
    (set, get) => ({
      currentStep: 1,

      hydrated: false,
      lastCompletedStep: 1,
      stepLoading: false,
      setStepLoading: (isLoading) => set({ stepLoading: isLoading }),
      personalData: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: "",
        location: "",
        linkedInUrl: "",
      },

      education: [],

      experience: [],

      skills: [],

      resumeUrl: "",

      portfolio: {
        githubUrl: "",
        portfolioUrl: "",
        linkedInUrl: "",
      },

      // setCurrentStep: (currentStep) =>
      //   set({
      //     currentStep,
      //   }),
      canAccessStep: (targetStep) => {
        const completed = get().lastCompletedStep;

        return targetStep <= completed + 1;
      },

      reset: () =>
        set({
          // currentStep: 1,
          education: [],
          experience: [],
          skills: [],
          resumeUrl: "",
        }),
    }),
    {
      name: "job-application-form",

      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: () => {
        return (state, error) => {
          if (state && !error) {
            state.hydrated = true;
          }
        };
      },
    },
  ),
);
