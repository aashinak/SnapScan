import React from "react";
import ReactMarkdown from "react-markdown";
import { Skeleton } from "./ui/skeleton";

function OutputBox({
  loading,
  description,
}: {
  loading: boolean;
  description: string;
}) {
  if (loading) {
    return <Skeleton className="w-full h-32 rounded-lg dark:bg-gray-700" />;
  }

  if (!description) {
    return null; // Handle case when description is empty
  }

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg border border-gray-700 shadow-lg">
      <ReactMarkdown className="prose prose-invert max-w-full">
        {description}
      </ReactMarkdown>
    </div>
  );
}

export default OutputBox;
