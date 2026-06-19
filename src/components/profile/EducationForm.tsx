import {
  educationSchema,
  ProfileEducationFormData,
} from "@/lib/jobPortalSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormField from "../common/FormField";

export default function EducationForm() {
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<ProfileEducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      college: "",
      degree: "",
      cgpa: 1,
      isCurrentlyStudying: false,
      startDate: "",
      endDate: "",
    },
  });
  const educationValues = watch("isCurrentlyStudying");
  return (
    <>
      <div>
        <h4>Add New Education</h4>
        <FormField label="College" error={errors?.college?.message}>
          <input
            {...register(`college`)}
            className="w-full rounded-xl border p-3"
          />
        </FormField>
        <FormField label="Degree" error={errors.degree?.message}>
          <input
            {...register(`degree`)}
            className="w-full rounded-xl border p-3"
          />
        </FormField>
        <FormField label="Cgpa" error={errors?.cgpa?.message}>
          <input
            {...register(`cgpa`)}
            className="w-full rounded-xl border p-3"
          />
        </FormField>
        <FormField label="Start Date" error={errors?.startDate?.message}>
          <input
            type="month"
            {...register(`startDate`)}
            className="w-full rounded-xl border p-3"
          />
        </FormField>
        <FormField
          label="Is currently studing"
          error={errors.isCurrentlyStudying?.message}
        >
          <input type="checkbox" {...register(`isCurrentlyStudying`)} />
        </FormField>
        {!educationValues && (
          <FormField label="End Date" error={errors?.endDate?.message}>
            <input
              type="month"
              {...register(`endDate`)}
              className="w-full rounded-xl border p-3"
            />
          </FormField>
        )}
      </div>
    </>
  );
}
