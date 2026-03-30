"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: readonly string[] | string[];
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, placeholder = "Select...", className = "", ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={`w-full appearance-none border border-gray-300 bg-white px-3 py-2.5 pr-10 text-sm text-[#373737] shadow-sm transition-colors focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c] disabled:bg-gray-100 disabled:text-gray-500 ${className}`}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
