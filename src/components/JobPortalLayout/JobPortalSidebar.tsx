"use client";

import { Check, Clock3, Lock } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { JOB_PORTAL_STEPS } from "@/constants/jobPortalSteps";
import { useApplicationStore } from "@/app/store/useApplicationStore";

export default function JobPortalSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { lastCompletedStep } = useApplicationStore();

  return (
    <aside className="w-[320px] bg-white border-r h-screen p-6 sticky top-0 hidden lg:block">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Job Application</h2>

        <p className="text-sm text-muted-foreground mt-1">
          Complete your profile
        </p>
      </div>

      <div className="relative">
        {JOB_PORTAL_STEPS.map((step, index) => {
          const isCompleted = step.id <= lastCompletedStep;

          const isCurrent = pathname === step.path;

          const isLocked = step.id > lastCompletedStep + 1;

          return (
            <div key={step.id} className="relative flex gap-4 pb-8">
              {/* line */}
              {index !== JOB_PORTAL_STEPS.length - 1 && (
                <div className="absolute left-5 top-10 h-full w-[2px] bg-gray-200" />
              )}

              {/* icon */}
              <button
                disabled={isLocked}
                onClick={() => router.push(step.path)}
                className={`
                    z-10 flex h-10 w-10 items-center justify-center rounded-full border
                    ${
                      isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : isCurrent
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-100 border-gray-300 text-gray-500"
                    }
                  `}
              >
                {isCompleted ? (
                  <Check size={18} />
                ) : isLocked ? (
                  <Lock size={16} />
                ) : (
                  <Clock3 size={16} />
                )}
              </button>

              {/* text */}
              <div>
                <h4
                  className={`font-medium ${isCurrent ? "text-primary" : ""}`}
                >
                  {step.title}
                </h4>

                <p className="text-sm text-muted-foreground">
                  {isCompleted
                    ? "Completed"
                    : isCurrent
                      ? "In Progress"
                      : isLocked
                        ? "Locked"
                        : "Pending"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
