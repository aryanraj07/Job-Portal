import { useApplicationStore } from "@/app/store/useApplicationStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useStepGuard(targetStep: number) {
  const router = useRouter();

  const { lastCompletedStep } = useApplicationStore();

  useEffect(() => {
    const allowedStep = lastCompletedStep + 1;

    if (targetStep > allowedStep) {
      router.replace(`/job-portal/step-${allowedStep}`);
    }
  }, [targetStep, lastCompletedStep, router]);
}
