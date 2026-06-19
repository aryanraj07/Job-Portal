"use client";

import { CheckCircle } from "lucide-react";

export default function SuccessStep() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <CheckCircle size={80} className="text-green-500 mb-6" />

      <h2 className="text-3xl font-bold">Application Submitted</h2>

      <p className="mt-3 text-slate-600">
        Thank you for applying. Our team will review your application and
        contact you shortly.
      </p>
    </div>
  );
}
