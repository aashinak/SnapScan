"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import axios from "axios";
import { Button } from "./ui/button";

export function FileUploadBox({
  setDescrition,
  setLoading,
}: {
  setDescrition: (data: string) => void;
  setLoading: (loading: boolean) => void;
}) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = async (files: File[]) => {
    // Allow only one file
    if (files.length > 1) {
      alert("Only one file can be uploaded at a time.");
      return;
    }

    const selectedFile = files[0];

    if (
      selectedFile.type !== "image/png" &&
      selectedFile.type !== "image/jpeg"
    ) {
      alert("Only PNG and JPG files are allowed.");
      return;
    }

    setFile(selectedFile);
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // Send the file to the server
      const formData = new FormData();
      formData.append("file", file!);
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload successful:", res.data);
      setDescrition(res.data.description);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setDescrition("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2  border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
      <div className="flex gap-2 justify-end">
        <Button onClick={handleReset}>Reset</Button>
        <Button onClick={handleGenerate}>Generate ✨</Button>
      </div>
    </div>
  );
}
