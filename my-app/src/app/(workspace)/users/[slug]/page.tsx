"use client";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const UserPage = () => {
  const router = useRouter();
  useEffect(() => {}, []);
  return (
    <div>
      <div className="flex items-center text-[20px] font-bold cursor-pointer" onClick={() => router.back()}>
        <IconArrowNarrowLeft stroke={2} />
        Back
      </div>
    </div>
  );
};

export default UserPage;
