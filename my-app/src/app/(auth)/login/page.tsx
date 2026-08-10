"use client";

import React from "react";

const page = () => {
  const handleSubmit = () => {
    console.log("welcome");
  };
  return (
    <main className="min-h-svh lg:h-screen lg:overflow-hidden bg-black">
      <div className="flex justify-center items-center h-screen">
        <div className="rounded-xl flex flex-col justify-center w-100 space-y-4 p-4 text-center border shadow-md shadow-amber-100 h-100">
          <div>
            <div className="text-[26px] font-bold text-white">Welcome Back</div>
            <div className="text-[18px] font-medium text-gray-400">
              Please enter your details
            </div>
          </div>

          <div className="space-y-3">
            <div className="w-full flex flex-col items-start">
              <label className="text-white text-[16px]">
                Email Address
                <span className="text-[red] ms-1">*</span>
              </label>

              <input
                type="text"
                className="w-full rounded-[6px] text-white px-2 py-1 border border-white"
                placeholder="Enter Your Email Address"
              />
            </div>

            <div className="w-full flex flex-col items-start">
              <label className="text-white text-[16px]">
                Password
                <span className="text-[red] ms-1">*</span>
              </label>

              <input
                type="password"
                className="w-full rounded-[6px] text-white px-2 py-1 border border-white"
                placeholder="Enter Your password"
              />
            </div>
          </div>

          <div className="mt-3">
            <button
              className="text-white rounded-full bg-green-900 w-full py-2 cursor-pointer"
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
