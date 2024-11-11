import React from "react";

export default function LoaderComponent() {
  return (
    <div className="fixed inset-0 bg-[#F6F7F8] bg-opacity-60 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#01F0D0]"></div>
    </div>
  );
}


