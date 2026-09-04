"use client";

import { useRef } from "react";
import { UserPlus, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { createUser } from "@/src/services/userService";
import { toast } from "react-toastify";

const addUserSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required"),
  last_name: z.string().trim().min(1, "Last name is required"),
  mobile_number: z
    .string()
    .trim()
    .min(1, "Mobile number is required")
    .regex(/^\+?[0-9 ()-]{7,10}$/, "Enter a valid mobile number"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email"),
  role: z.enum(["admin", "viewer", "learner"], {
    message: "Select a role",
  }),
  status: z.enum(["active", "inactive"]),
});

type AddUserFormValues = z.infer<typeof addUserSchema>;

const inputClassName =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-3 focus:ring-emerald-100";

export default function AddUserDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors,isSubmitting  },
  } = useForm<AddUserFormValues>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      mobile_number: "",
      email: "",
      role: undefined,
      status: "active",
    },
  });

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    reset();
    dialogRef.current?.close();
  };

  const submitUser: SubmitHandler<AddUserFormValues> = async (values) => {
    try {
      const response = await createUser(values);
      console.log(response);
      toast.success("User created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="flex w-fit items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-emerald-200"
      >
        <UserPlus size={18} /> Add user
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="add-user-title"
        onClose={() => reset()}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-2xl bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/55"
      >
        <form
          onSubmit={handleSubmit(submitUser)}
          noValidate
          className="overflow-hidden"
        >
          <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
            <div>
              <h3 id="add-user-title" className="text-xl font-bold">
                Add user
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Enter the new user&apos;s details and account access.
              </p>
            </div>
            <button
              type="button"
              onClick={closeDialog}
              aria-label="Close add user dialog"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-emerald-200"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid gap-5 px-5 py-6 sm:grid-cols-2 sm:px-6">
            <label className="text-sm font-semibold text-slate-700">
              First name
              <input
                {...register("first_name")}
                type="text"
                autoComplete="given-name"
                placeholder="Enter first name"
                className={inputClassName}
                aria-invalid={errors.first_name ? "true" : "false"}
              />
              {errors.first_name && (
                <span className="mt-1 block text-xs font-medium text-red-600">
                  {errors.first_name.message}
                </span>
              )}
            </label>

            <label className="text-sm font-semibold text-slate-700">
              Last name
              <input
                {...register("last_name")}
                type="text"
                autoComplete="family-name"
                placeholder="Enter last name"
                className={inputClassName}
                aria-invalid={errors.last_name ? "true" : "false"}
              />
              {errors.last_name && (
                <span className="mt-1 block text-xs font-medium text-red-600">
                  {errors.last_name.message}
                </span>
              )}
            </label>

            <label className="text-sm font-semibold text-slate-700">
              Mobile number
              <input
                {...register("mobile_number")}
                type="tel"
                autoComplete="tel"
                placeholder="Enter mobile number"
                className={inputClassName}
                aria-invalid={errors.mobile_number ? "true" : "false"}
              />
              {errors.mobile_number && (
                <span className="mt-1 block text-xs font-medium text-red-600">
                  {errors.mobile_number.message}
                </span>
              )}
            </label>

            <label className="text-sm font-semibold text-slate-700">
              Email
              <input
                {...register("email")}
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                className={inputClassName}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <span className="mt-1 block text-xs font-medium text-red-600">
                  {errors.email.message}
                </span>
              )}
            </label>

            <label className="text-sm font-semibold text-slate-700">
              Role
              <select
                {...register("role")}
                defaultValue=""
                className={inputClassName}
                aria-invalid={errors.role ? "true" : "false"}
              >
                <option value="" disabled>
                  Select a role
                </option>
                <option value="admin">Admin</option>
                <option value="viewer">Viewer</option>
                <option value="learner">Learner</option>
              </select>
              {errors.role && (
                <span className="mt-1 block text-xs font-medium text-red-600">
                  {errors.role.message}
                </span>
              )}
            </label>

            <label className="text-sm font-semibold text-slate-700">
              Status
              <select
                {...register("status")}
                className={inputClassName}
                aria-invalid={errors.status ? "true" : "false"}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && (
                <span className="mt-1 block text-xs font-medium text-red-600">
                  {errors.status.message}
                </span>
              )}
            </label>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
            <button
              type="button"
              onClick={closeDialog}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit" disabled={isSubmitting}
              className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-emerald-200"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
