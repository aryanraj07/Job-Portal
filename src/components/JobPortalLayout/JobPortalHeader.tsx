"use client";

import { JOB_PORTAL_STEPS } from "@/constants/jobPortalSteps";
import { useApplicationStore } from "@/app/store/useApplicationStore";

export default function JobPortalHeader() {
  const { lastCompletedStep } = useApplicationStore();

  const progress = (lastCompletedStep / JOB_PORTAL_STEPS.length) * 100;

  return (
    <div className="bg-white border-b p-6">
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold">Application Progress</h3>

        <span>{Math.round(progress)}%</span>
      </div>

      <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
        <div
          style={{
            width: `${progress}%`,
          }}
          className="h-full bg-green-500 transition-all duration-500"
        />
      </div>
    </div>
  );
}
