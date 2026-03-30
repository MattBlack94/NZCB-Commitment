"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/lib/schema";
import FormField from "@/components/ui/FormField";
import DataTable from "@/components/ui/DataTable";
import { stakeholderTypes, advocacyActionTypes } from "@/data/formOptions";

interface SectionAdvocacyProps {
  form: UseFormReturn<FormData>;
}

export default function SectionAdvocacy({ form }: SectionAdvocacyProps) {
  const { register, watch, setValue } = form;

  const advocacyProgramme = watch("advocacyProgramme");
  const advocacyActions = watch("advocacyActions") || [];

  const addAdvocacyAction = () => {
    if (advocacyActions.length >= 8) return;
    setValue("advocacyActions", [
      ...advocacyActions,
      {
        stakeholderType: "",
        actionType: "",
        description: "",
        link: "",
      },
    ]);
  };

  const removeAdvocacyAction = (index: number) => {
    setValue(
      "advocacyActions",
      advocacyActions.filter((_: unknown, i: number) => i !== index)
    );
  };

  const updateAdvocacyAction = (
    index: number,
    key: string,
    value: unknown
  ) => {
    const updated = [...advocacyActions];
    updated[index] = { ...updated[index], [key]: value };
    setValue("advocacyActions", updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#1d4354] mb-1">
          Section 5: Advocacy & Engagement
        </h2>
        <p className="text-sm text-gray-500">
          Share how your organisation advocates for net zero carbon buildings and
          engages with stakeholders to drive industry transformation.
        </p>
      </div>

      <FormField
        label="Does your organisation have a formal advocacy programme for net zero carbon buildings?"
        tooltip="An advocacy programme is any structured effort to influence stakeholders, policy, or industry practices toward net zero carbon buildings."
      >
        <div className="flex gap-4">
          <label
            className={`flex items-center gap-2 px-4 py-2.5 border cursor-pointer transition-colors ${
              advocacyProgramme
                ? "bg-[#3c886c]/5 border-[#3c886c] text-[#1d4354]"
                : "bg-white border-gray-200 hover:border-[#3c886c]/50"
            }`}
          >
            <input
              type="radio"
              checked={advocacyProgramme === true}
              onChange={() => setValue("advocacyProgramme", true)}
              className="text-[#3c886c] focus:ring-[#3c886c]"
            />
            <span className="text-sm font-medium">Yes</span>
          </label>
          <label
            className={`flex items-center gap-2 px-4 py-2.5 border cursor-pointer transition-colors ${
              advocacyProgramme === false
                ? "bg-[#3c886c]/5 border-[#3c886c] text-[#1d4354]"
                : "bg-white border-gray-200 hover:border-[#3c886c]/50"
            }`}
          >
            <input
              type="radio"
              checked={advocacyProgramme === false}
              onChange={() => setValue("advocacyProgramme", false)}
              className="text-[#3c886c] focus:ring-[#3c886c]"
            />
            <span className="text-sm font-medium">No</span>
          </label>
        </div>
      </FormField>

      {advocacyProgramme && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-[#1d4354] mb-1">
              Advocacy Actions
            </h3>
            <p className="text-xs text-gray-500 mb-3">
              Add up to 8 advocacy actions describing how your organisation
              engages with different stakeholder groups. Include links to
              supporting evidence where available.
            </p>
            <DataTable
              columns={[
                {
                  key: "stakeholderType",
                  header: "Stakeholder",
                  type: "select",
                  options: [...stakeholderTypes],
                  width: "160px",
                },
                {
                  key: "actionType",
                  header: "Action Type",
                  type: "select",
                  options: [...advocacyActionTypes],
                  width: "160px",
                },
                {
                  key: "description",
                  header: "Description",
                  type: "text",
                  placeholder: "Describe the action taken...",
                },
                {
                  key: "link",
                  header: "Evidence Link",
                  type: "text",
                  placeholder: "https://...",
                  width: "180px",
                },
              ]}
              data={advocacyActions}
              onCellChange={updateAdvocacyAction}
              onAddRow={addAdvocacyAction}
              onRemoveRow={removeAdvocacyAction}
              addLabel="Add advocacy action"
              maxRows={8}
            />
          </div>

          {advocacyActions.length > 0 && (
            <div className="bg-[#3c886c]/5 border border-[#3c886c]/20 p-3">
              <p className="text-xs text-[#3c886c]">
                <strong>{advocacyActions.length}</strong> of 8 advocacy actions
                added.{" "}
                {advocacyActions.filter(
                  (a: { stakeholderType: string; actionType: string }) =>
                    a.stakeholderType && a.actionType
                ).length > 0 && (
                  <>
                    Covering{" "}
                    {
                      new Set(
                        advocacyActions
                          .filter(
                            (a: { stakeholderType: string }) =>
                              a.stakeholderType
                          )
                          .map(
                            (a: { stakeholderType: string }) =>
                              a.stakeholderType
                          )
                      ).size
                    }{" "}
                    stakeholder group(s).
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="border-t border-gray-200 pt-6">
        <FormField
          label="Additional Information"
          tooltip="Use this space to provide any additional context, achievements, challenges, or plans related to your NZCB commitment that haven't been captured elsewhere."
        >
          <textarea
            {...register("additionalInfo")}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
            rows={5}
            placeholder="Share any additional information about your organisation's journey toward net zero carbon buildings..."
          />
        </FormField>
      </div>
    </div>
  );
}
