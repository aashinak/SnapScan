"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { FileUploadBox } from "@/components/UploadBox";
import React, { useState } from "react";
import OutputBox from "./OutputBox";

export default function HomeLayout() {
  const [loading, setLoading] = useState<boolean>(false);
  const [description, setDescrition] = useState<string>("");

  return (
    <div className="min-h-screen w-full bg-neutral-950 relative flex flex-col antialiased">
      <div className="mx-auto p-4 flex flex-col mt-10 gap-5 items-center">
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          Scan, Read & Summarize
        </h1>
        <div className="w-[600px] mt-4 flex flex-col gap-4">
          <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-zinc-900">
            <FileUploadBox
              setDescrition={setDescrition}
              setLoading={setLoading}
            />
          </BackgroundGradient>

          <div className="w-[600px]">
            <OutputBox description={description} loading={loading} />
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}
