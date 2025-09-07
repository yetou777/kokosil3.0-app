"use client";

import { ReactNode } from "react";
import IconClose from "@/components/icons/dialog-close.svg";

type SlideInPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  direction?: "left" | "right";
  topPosition?: string;
  children: ReactNode;
};

export default function SlideInPanel({
  isOpen,
  onClose,
  title,
  direction = "right",
  topPosition = "top-[6.25rem]",
  children,
}: SlideInPanelProps) {
  return (
    <div
      className={`fixed inset-0 z-20 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/30"></div>

      {/* Panel */}
      <div
        className={`absolute ${topPosition} w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          direction === "right"
            ? `right-0 ${isOpen ? "translate-x-0" : "translate-x-full"}`
            : `left-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`
        }`}
      >
        {/* Dialog Header */}
        <div className="relative flex items-center justify-center p-4 border-b border-gray-200">
          <h2 className="text-lg text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100"
          >
            <IconClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Dialog Content */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
