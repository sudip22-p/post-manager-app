"use client";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full bg-white"></div>
        <div className="absolute inset-4 flex items-center justify-center">
          <span className="text-blue-500 font-bold animate-pulse">...</span>
        </div>
      </div>
    </div>
  );
}
