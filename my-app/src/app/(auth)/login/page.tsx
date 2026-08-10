"use client";

import { login } from "@/src/services/authService";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await login(data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-svh lg:h-screen lg:overflow-hidden bg-black">
      <div className="flex justify-center items-center h-screen">
        <div className="rounded-xl flex flex-col justify-center w-100 space-y-4 p-4 text-center shadow-[0_0_12px_1px_rgba(0,0,0,0.15)] shadow-green-500 h-100">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="text-[26px] font-bold text-white">
                Welcome Back
              </div>
              <div className="text-[18px] font-medium text-gray-400">
                Please enter your details
              </div>
            </div>

            <div className="space-y-3">
              <div className="w-full flex flex-col items-start">
                <label className="text-white text-[16px] mb-2">
                  Email Address
                  <span className="text-[red] ms-1">*</span>
                </label>

                <input
                  type="text"
                  className="w-full rounded-[6px] text-white px-2 py-1 border border-white"
                  placeholder="Enter Your Email Address"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="w-full flex flex-col items-start mb-2">
                <label className="text-white text-[16px]">
                  Password
                  <span className="text-[red] ms-1">*</span>
                </label>

                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full rounded-[6px] text-white px-2 py-1 pr-10 border border-white bg-transparent"
                    placeholder="Enter Your password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-3">
              <button
                className="text-white rounded-full bg-green-900 w-full py-2 cursor-pointer"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Page;
