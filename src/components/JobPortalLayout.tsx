import { useApplicationStore } from "@/app/store/useApplicationStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import PersonalDetailsForm from "./jobPortalForm/PersonalInfoStep";
import EducationDetailsForm from "./jobPortalForm/EducationStep";
import ExperienceForm from "./jobPortalForm/ExperienceStep";
import SkillsForm from "./jobPortalForm/SkillsStep";
import ResumeForm from "./jobPortalForm/ResumeStep";
import PortfolioForm from "./jobPortalForm/PortfolioStep";
import ReviewStep from "./jobPortalForm/ReviewStep";
import SubmitStep from "./jobPortalForm/SuccessStep";
import JobPortalHeader from "./JobPortalLayout/JobPortalHeader";
import JobPortalSidebar from "./JobPortalLayout/JobPortalSidebar";
import PersonalInfoStep from "./jobPortalForm/PersonalInfoStep";
const canAcessNextStep = (targetStep: number, completedSteps: number[]) => {
  return targetStep <= completedSteps.length + 1;
};
// constants/jobPortalSteps.ts

export const JOB_PORTAL_STEPS = [
  {
    id: 1,
    title: "Personal Details",
    path: "/job-portal/personal-details",
  },
  {
    id: 2,
    title: "Education",
    path: "/job-portal/education-details",
  },
  {
    id: 3,
    title: "Experience",
    path: "/job-portal/experience",
  },
  {
    id: 4,
    title: "Skills",
    path: "/job-portal/skills",
  },
  {
    id: 5,
    title: "Resume",
    path: "/job-portal/resume",
  },
  {
    id: 6,
    title: "Portfolio",
    path: "/job-portal/portfolio",
  },
  {
    id: 7,
    title: "Review",
    path: "/job-portal/review",
  },
];
const JobPortalLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    currentStep,
    hydrated,
    stepLoading,
    setStepLoading,
    lastCompletedStep,
  } = useApplicationStore();
  const router = useRouter();
  const handleStepLoading = async (callback = () => {}) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setStepLoading(true);
    try {
      await callback();
    } finally {
      setStepLoading(false);
    }
  };
  // current Step logic
  // then it should render the steps currently and stop further steps visiting
  // then render the form
  const shared = { handleStepLoading };
  // const renderForm = () => {
  //   //
  //   switch (currentStep) {
  //     case 1:
  //       return <PersonalInfoStep {...shared} />;
  //     case 2:
  //       return <EducationDetailsForm {...shared} />;

  //     case 3:
  //       return <ExperienceForm {...shared} />;
  //     case 4:
  //       return <SkillsForm {...shared} />;
  //     case 5:
  //       return <ResumeForm {...shared} />;

  //     case 6:
  //       return <PortfolioForm {...shared} />;
  //     case 7:
  //       return <ReviewStep {...shared} />;
  //     case 5:
  //       return <SubmitStep {...shared} />;
  //   }
  //   if (lastCompletedStep == 0) {
  //     router;
  //   }
  // };
  // useEffect(() => {
  //   if (stepLoading) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [stepLoading]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <JobPortalSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
};
export default JobPortalLayout;
