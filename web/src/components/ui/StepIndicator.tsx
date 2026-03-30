"use client";

import React from "react";
import { Check } from "lucide-react";

interface Step {
  number: number;
  title: string;
  active: boolean;
  completed: boolean;
  visible: boolean;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function StepIndicator({
  steps,
  currentStep,
  onStepClick,
}: StepIndicatorProps) {
  const visibleSteps = steps.filter((s) => s.visible);

  return (
    <div className="w-full mb-8">
      {/* Desktop step indicator */}
      <div className="hidden md:flex items-center justify-between">
        {visibleSteps.map((step, index) => (
          <React.Fragment key={step.number}>
            <button
              type="button"
              onClick={() => onStepClick(step.number)}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div
                className={`w-10 h-10 flex items-center justify-center text-sm font-semibold transition-all ${
                  step.number === currentStep
                    ? "bg-[#3c886c] text-white ring-2 ring-[#6fda44] ring-offset-2"
                    : step.completed
                    ? "bg-[#6fda44] text-white"
                    : "bg-gray-200 text-gray-500 group-hover:bg-gray-300"
                }`}
              >
                {step.completed ? <Check size={18} /> : step.number}
              </div>
              <span
                className={`text-xs font-medium max-w-[100px] text-center leading-tight ${
                  step.number === currentStep
                    ? "text-[#3c886c]"
                    : step.completed
                    ? "text-[#6fda44]"
                    : "text-gray-500"
                }`}
              >
                {step.title}
              </span>
            </button>
            {index < visibleSteps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 mt-[-20px] ${
                  step.completed ? "bg-[#6fda44]" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile step indicator */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#3c886c]">
            Step {currentStep} of {visibleSteps.length}
          </span>
          <span className="text-sm text-[#1d4354]">
            {visibleSteps.find((s) => s.number === currentStep)?.title}
          </span>
        </div>
        <div className="w-full bg-gray-200 h-2">
          <div
            className="bg-[#6fda44] h-2 transition-all duration-300"
            style={{
              width: `${
                ((visibleSteps.findIndex((s) => s.number === currentStep) + 1) /
                  visibleSteps.length) *
                100
              }%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
