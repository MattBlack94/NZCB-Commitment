"use client";

import React, { useState } from "react";
import { Info } from "lucide-react";

interface FormFieldProps {
  label: string;
  error?: string;
  tooltip?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function FormField({
  label,
  error,
  tooltip,
  required,
  children,
  className = "",
}: FormFieldProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-center gap-1.5 mb-1.5">
        <label className="block text-sm font-semibold text-[#1d4354]">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {tooltip && (
          <div className="relative">
            <button
              type="button"
              className="text-gray-400 hover:text-[#3c886c] transition-colors"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
              aria-label="More information"
            >
              <Info size={14} />
            </button>
            {showTooltip && (
              <div className="absolute z-50 left-6 top-0 w-64 p-2.5 bg-[#3c886c]/5 border border-[#3c886c]/20 shadow-lg text-xs text-[#373737] leading-relaxed">
                {tooltip}
              </div>
            )}
          </div>
        )}
      </div>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
