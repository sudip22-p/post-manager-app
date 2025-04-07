"use client";

import { useEffect } from "react";
import Button from "./Button";

export default function Popup({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Popup */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-4 transform transition-all">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{message}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 p-6 bg-gray-50 rounded-b-xl">
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full sm:w-auto order-2 sm:order-1 cursor-pointer"
          >
            {cancelText}
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            className="w-full sm:w-auto order-1 sm:order-2 cursor-pointer"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
