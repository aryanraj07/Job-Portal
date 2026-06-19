// // hooks/useJobApplicationForm.ts

// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ZodTypeAny } from "zod";
// import { useEffect } from "react";

// interface Props<T> {
//   schema: ZodTypeAny;
//   defaultValues: T;
//   onSubmit: (data: T) => Promise<void> | void;
// }

// export function useJobApplicationForm<T>({
//   schema,
//   defaultValues,
//   onSubmit,
// }: Props<T>) {
//   const form = useForm<T>({
//     resolver: zodResolver(schema),
//     defaultValues,
//     mode: "onChange",
//   });
//   const handleSubmit = form.handleSubmit(async (data) => {
//     await onSubmit(data);
//   });
//   useEffect(() => {
//     if (defaultValues) {
//       form.reset(defaultValues);
//     }
//   }, [defaultValues, form]);
//   return {
//     ...form,
//     handleSubmit,
//   };
// }
