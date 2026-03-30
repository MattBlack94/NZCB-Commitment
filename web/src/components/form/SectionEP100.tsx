"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/lib/schema";
import FormField from "@/components/ui/FormField";

interface SectionEP100Props {
  form: UseFormReturn<FormData>;
}

export default function SectionEP100({ form }: SectionEP100Props) {
  const { register, watch } = form;

  const baselineIntensity = watch("ep100BaselineIntensity") || 0;
  const currentIntensity = watch("ep100CurrentIntensity") || 0;

  const improvementPercent =
    baselineIntensity > 0
      ? (((baselineIntensity - currentIntensity) / baselineIntensity) * 100).toFixed(1)
      : "0.0";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#1d4354] mb-1">
          Section 6: EP100 Reporting
        </h2>
        <p className="text-sm text-gray-500">
          As an EP100 signatory, report on your energy productivity improvement
          targets and progress. EP100 members commit to doubling their energy
          productivity within 25 years.
        </p>
      </div>

      <div className="bg-[#1d4354]/5 border border-[#1d4354]/20 p-4">
        <p className="text-sm text-[#1d4354]">
          <strong>EP100</strong> is a global corporate energy initiative led by
          The Climate Group, bringing together over 120 businesses committed to
          using energy smarter to lower emissions and accelerate the clean energy
          economy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="EP100 Target Year"
          tooltip="The year by which your organisation commits to achieving its EP100 energy productivity target."
        >
          <input
            type="number"
            {...register("ep100TargetYear")}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
            min={2025}
            max={2050}
            placeholder="e.g., 2030"
          />
        </FormField>
        <FormField
          label="Baseline Year"
          tooltip="The baseline year against which energy productivity improvement is measured."
        >
          <input
            type="number"
            {...register("ep100BaselineYear")}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
            min={2000}
            max={2025}
            placeholder="e.g., 2015"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Baseline Energy Intensity (kWh/m2)"
          tooltip="Energy intensity in the baseline year. This is total energy consumption divided by floor area."
        >
          <input
            type="number"
            {...register("ep100BaselineIntensity")}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
            min={0}
            step={0.1}
            placeholder="e.g., 250.0"
          />
        </FormField>
        <FormField
          label="Current Energy Intensity (kWh/m2)"
          tooltip="Energy intensity for the current reporting period."
        >
          <input
            type="number"
            {...register("ep100CurrentIntensity")}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
            min={0}
            step={0.1}
            placeholder="e.g., 180.0"
          />
        </FormField>
      </div>

      {/* Progress indicator */}
      <div className="bg-[#3c886c]/5 border border-[#3c886c]/20 p-4">
        <h3 className="text-sm font-semibold text-[#1d4354] mb-3">
          Energy Productivity Improvement
        </h3>
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>0%</span>
              <span>50% (double)</span>
              <span>100%</span>
            </div>
            <div className="w-full bg-gray-200 h-4 relative">
              <div
                className={`h-4 transition-all duration-500 ${
                  Number(improvementPercent) >= 50
                    ? "bg-[#6fda44]"
                    : Number(improvementPercent) >= 25
                    ? "bg-amber-500"
                    : "bg-red-400"
                }`}
                style={{
                  width: `${Math.min(Math.max(Number(improvementPercent), 0), 100)}%`,
                }}
              />
              {/* 50% target marker */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-[#1d4354]" />
            </div>
          </div>
          <div className="text-center min-w-[80px]">
            <p className="text-2xl font-bold text-[#1d4354]">
              {improvementPercent}%
            </p>
            <p className="text-xs text-gray-500">improvement</p>
          </div>
        </div>
        {baselineIntensity > 0 && currentIntensity > 0 && (
          <p className="text-xs text-[#373737] mt-2">
            Energy intensity reduced from {baselineIntensity.toFixed(1)} to{" "}
            {currentIntensity.toFixed(1)} kWh/m2 (
            {(baselineIntensity - currentIntensity).toFixed(1)} kWh/m2
            reduction).
            {Number(improvementPercent) >= 50
              ? " Target achieved!"
              : ` ${(50 - Number(improvementPercent)).toFixed(1)} percentage points to reach the 50% doubling target.`}
          </p>
        )}
      </div>

      <FormField
        label="Progress Towards Target (%)"
        tooltip="Your self-assessed progress toward the EP100 energy productivity target as a percentage."
      >
        <input
          type="number"
          {...register("ep100ProgressPercent")}
          className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
          min={0}
          max={100}
          placeholder="e.g., 35"
        />
      </FormField>

      <FormField
        label="Key EP100 Actions & Achievements"
        tooltip="Describe the main energy productivity actions taken during the reporting period, including any notable achievements, technologies deployed, or behavioural changes implemented."
      >
        <textarea
          {...register("ep100Actions")}
          className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
          rows={5}
          placeholder="Describe key actions taken to improve energy productivity, such as:&#10;- LED lighting retrofits across portfolio&#10;- BMS optimisation and demand response&#10;- Occupancy sensor deployment&#10;- Tenant engagement programmes"
        />
      </FormField>
    </div>
  );
}
