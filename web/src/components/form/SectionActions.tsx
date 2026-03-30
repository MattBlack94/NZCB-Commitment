"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/lib/schema";
import FormField from "@/components/ui/FormField";
import DataTable from "@/components/ui/DataTable";
import {
  actionCategories,
  actionStatuses,
  actionScopes,
} from "@/data/formOptions";

interface SectionActionsProps {
  form: UseFormReturn<FormData>;
}

export default function SectionActions({ form }: SectionActionsProps) {
  const { register, watch, setValue } = form;

  const actions = watch("actions") || [];
  const qaUndertaken = watch("qaUndertaken");
  const electrificationPlans = watch("electrificationPlans");

  const addAction = () => {
    setValue("actions", [
      ...actions,
      {
        category: "",
        target: "",
        milestones: "",
        progress: "",
        status: "Not started",
        scope: "Asset level",
        expectedCompletion: "",
        energySaving: 0,
        carbonReduction: 0,
      },
    ]);
  };

  const removeAction = (index: number) => {
    setValue(
      "actions",
      actions.filter((_: unknown, i: number) => i !== index)
    );
  };

  const updateAction = (index: number, key: string, value: unknown) => {
    const updated = [...actions];
    updated[index] = { ...updated[index], [key]: value };
    setValue("actions", updated);
  };

  // Calculate totals
  const totalEnergySaving = actions.reduce(
    (sum: number, a: { energySaving: number }) => sum + (a.energySaving || 0),
    0
  );
  const totalCarbonReduction = actions.reduce(
    (sum: number, a: { carbonReduction: number }) =>
      sum + (a.carbonReduction || 0),
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#1d4354] mb-1">
          Section 4: Decarbonisation Actions
        </h2>
        <p className="text-sm text-gray-500">
          Detail the specific actions your organisation is taking or planning to
          reduce carbon emissions across your portfolio.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[#1d4354] mb-3">
          Actions & Targets
        </h3>
        <DataTable
          columns={[
            {
              key: "category",
              header: "Category",
              type: "select",
              options: [...actionCategories],
              width: "160px",
            },
            {
              key: "target",
              header: "Target / Goal",
              type: "text",
              placeholder: "Describe the target",
            },
            {
              key: "milestones",
              header: "Key Milestones",
              type: "text",
              placeholder: "Major milestones",
            },
            {
              key: "progress",
              header: "Progress Update",
              type: "text",
              placeholder: "Current status",
            },
            {
              key: "status",
              header: "Status",
              type: "select",
              options: [...actionStatuses],
              width: "120px",
            },
            {
              key: "scope",
              header: "Scope",
              type: "select",
              options: [...actionScopes],
              width: "120px",
            },
            {
              key: "expectedCompletion",
              header: "Expected Completion",
              type: "text",
              placeholder: "e.g., 2027",
              width: "120px",
            },
            {
              key: "energySaving",
              header: "Energy Saving (kWh)",
              type: "number",
              width: "120px",
            },
            {
              key: "carbonReduction",
              header: "Carbon Reduction (tCO2e)",
              type: "number",
              width: "130px",
            },
          ]}
          data={actions}
          onCellChange={updateAction}
          onAddRow={addAction}
          onRemoveRow={removeAction}
          addLabel="Add decarbonisation action"
        />
        {actions.length > 0 && (
          <div className="mt-3 flex gap-6 text-sm">
            <span className="text-gray-500">
              Total energy saving:{" "}
              <strong className="text-[#3c886c]">
                {totalEnergySaving.toLocaleString()} kWh
              </strong>
            </span>
            <span className="text-gray-500">
              Total carbon reduction:{" "}
              <strong className="text-[#3c886c]">
                {totalCarbonReduction.toLocaleString()} tCO2e
              </strong>
            </span>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-6 space-y-4">
        <h3 className="text-sm font-semibold text-[#1d4354]">
          Quality Assurance
        </h3>
        <FormField
          label="Has Quality Assurance been undertaken?"
          tooltip="Quality assurance refers to any formal review or audit of your decarbonisation strategy or actions."
        >
          <div className="flex gap-4">
            <label
              className={`flex items-center gap-2 px-4 py-2.5 border cursor-pointer transition-colors ${
                qaUndertaken
                  ? "bg-[#3c886c]/5 border-[#3c886c] text-[#1d4354]"
                  : "bg-white border-gray-200 hover:border-[#3c886c]/50"
              }`}
            >
              <input
                type="radio"
                checked={qaUndertaken === true}
                onChange={() => setValue("qaUndertaken", true)}
                className="text-[#3c886c] focus:ring-[#3c886c]"
              />
              <span className="text-sm font-medium">Yes</span>
            </label>
            <label
              className={`flex items-center gap-2 px-4 py-2.5 border cursor-pointer transition-colors ${
                qaUndertaken === false
                  ? "bg-[#3c886c]/5 border-[#3c886c] text-[#1d4354]"
                  : "bg-white border-gray-200 hover:border-[#3c886c]/50"
              }`}
            >
              <input
                type="radio"
                checked={qaUndertaken === false}
                onChange={() => setValue("qaUndertaken", false)}
                className="text-[#3c886c] focus:ring-[#3c886c]"
              />
              <span className="text-sm font-medium">No</span>
            </label>
          </div>
        </FormField>
        {qaUndertaken && (
          <FormField label="QA Details">
            <textarea
              {...register("qaDetails")}
              className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
              rows={3}
              placeholder="Describe the quality assurance process undertaken..."
            />
          </FormField>
        )}
      </div>

      <div className="border-t border-gray-200 pt-6 space-y-4">
        <h3 className="text-sm font-semibold text-[#1d4354]">
          Electrification
        </h3>
        <FormField
          label="Are there plans for electrification?"
          tooltip="Electrification involves replacing fossil fuel systems (e.g., gas boilers) with electric alternatives (e.g., heat pumps)."
        >
          <div className="flex gap-4">
            <label
              className={`flex items-center gap-2 px-4 py-2.5 border cursor-pointer transition-colors ${
                electrificationPlans
                  ? "bg-[#3c886c]/5 border-[#3c886c] text-[#1d4354]"
                  : "bg-white border-gray-200 hover:border-[#3c886c]/50"
              }`}
            >
              <input
                type="radio"
                checked={electrificationPlans === true}
                onChange={() => setValue("electrificationPlans", true)}
                className="text-[#3c886c] focus:ring-[#3c886c]"
              />
              <span className="text-sm font-medium">Yes</span>
            </label>
            <label
              className={`flex items-center gap-2 px-4 py-2.5 border cursor-pointer transition-colors ${
                electrificationPlans === false
                  ? "bg-[#3c886c]/5 border-[#3c886c] text-[#1d4354]"
                  : "bg-white border-gray-200 hover:border-[#3c886c]/50"
              }`}
            >
              <input
                type="radio"
                checked={electrificationPlans === false}
                onChange={() => setValue("electrificationPlans", false)}
                className="text-[#3c886c] focus:ring-[#3c886c]"
              />
              <span className="text-sm font-medium">No</span>
            </label>
          </div>
        </FormField>
        {electrificationPlans && (
          <FormField label="Electrification Details">
            <textarea
              {...register("electrificationDetails")}
              className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
              rows={3}
              placeholder="Describe your electrification strategy and timeline..."
            />
          </FormField>
        )}
      </div>

      <div className="border-t border-gray-200 pt-6 space-y-4">
        <h3 className="text-sm font-semibold text-[#1d4354]">Carbon Offsets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Offset Type"
            tooltip="The type of carbon offset used (e.g., verified carbon credits, nature-based solutions)."
          >
            <input
              type="text"
              {...register("offsetType")}
              className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
              placeholder="e.g., Gold Standard VERs"
            />
          </FormField>
          <FormField
            label="Offset Source / Registry"
            tooltip="The registry or platform where your offsets are registered."
          >
            <input
              type="text"
              {...register("offsetSource")}
              className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
              placeholder="e.g., Verra, Gold Standard"
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}
