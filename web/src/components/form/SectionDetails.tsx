"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/lib/schema";
import FormField from "@/components/ui/FormField";
import { climateInitiatives } from "@/data/formOptions";

interface SectionDetailsProps {
  form: UseFormReturn<FormData>;
}

export default function SectionDetails({ form }: SectionDetailsProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const selectedInitiatives = watch("climateInitiatives") || [];

  const toggleInitiative = (initiative: string) => {
    const current = selectedInitiatives;
    if (current.includes(initiative)) {
      setValue(
        "climateInitiatives",
        current.filter((i: string) => i !== initiative)
      );
    } else {
      setValue("climateInitiatives", [...current, initiative]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#1d4354] mb-1">
          Section 1: Entity & Signatory Details
        </h2>
        <p className="text-sm text-gray-500">
          Confirm your organisation details and provide contact information for
          this submission.
        </p>
      </div>

      <div className="bg-[#3c886c]/5 border border-[#3c886c]/20 p-4 space-y-3">
        <h3 className="text-sm font-semibold text-[#1d4354] uppercase tracking-wide">
          Pre-populated Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Entity Name" required>
            <input
              type="text"
              {...register("entityName")}
              className="w-full border border-gray-300 px-3 py-2.5 text-sm bg-gray-50 focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
              readOnly
            />
          </FormField>
          <FormField label="Signatory ID">
            <input
              type="text"
              {...register("signatoryId")}
              className="w-full border border-gray-300 px-3 py-2.5 text-sm bg-gray-50 focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
              readOnly
            />
          </FormField>
          <FormField label="Year Joined">
            <input
              type="number"
              {...register("yearJoined")}
              className="w-full border border-gray-300 px-3 py-2.5 text-sm bg-gray-50 focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
              readOnly
            />
          </FormField>
          <FormField
            label="Commitment Version"
            tooltip="The version of the NZCB Commitment your organisation signed up to. This determines which sections of the form are applicable."
          >
            <input
              type="text"
              {...register("commitmentVersion")}
              className="w-full border border-gray-300 px-3 py-2.5 text-sm bg-gray-50 focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
              readOnly
            />
          </FormField>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Submitter Name"
          required
          error={errors.submitterName?.message}
        >
          <input
            type="text"
            {...register("submitterName")}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
            placeholder="Your full name"
          />
        </FormField>
        <FormField
          label="Submitter Email"
          required
          error={errors.submitterEmail?.message}
        >
          <input
            type="email"
            {...register("submitterEmail")}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
            placeholder="you@company.com"
          />
        </FormField>
      </div>

      <FormField
        label="Climate Initiatives"
        tooltip="Select any additional climate initiatives your organisation participates in. This helps us understand the broader context of your commitment."
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {climateInitiatives.map((initiative) => (
            <label
              key={initiative}
              className={`flex items-center gap-2 p-3 border cursor-pointer transition-colors ${
                selectedInitiatives.includes(initiative)
                  ? "bg-[#3c886c]/5 border-[#3c886c] text-[#1d4354]"
                  : "bg-white border-gray-200 hover:border-[#3c886c]/50"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedInitiatives.includes(initiative)}
                onChange={() => toggleInitiative(initiative)}
                className="border-gray-300 text-[#3c886c] focus:ring-[#3c886c]"
              />
              <span className="text-sm font-medium">{initiative}</span>
            </label>
          ))}
        </div>
      </FormField>

      <div className="bg-amber-50 border border-amber-200 p-4 space-y-4">
        <FormField
          label="Consent"
          required
          error={errors.consent?.message}
          tooltip="By checking this box, you confirm that the data provided is accurate and may be shared with WorldGBC for reporting purposes."
        >
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("consent")}
              className="mt-0.5 border-gray-300 text-[#3c886c] focus:ring-[#3c886c]"
            />
            <span className="text-sm text-[#373737]">
              I confirm that the information provided in this form is accurate to
              the best of my knowledge and I consent to WorldGBC using this data
              for annual commitment reporting purposes.
            </span>
          </label>
        </FormField>

        <FormField label="Marketing Opt-In">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("marketingOptIn")}
              className="mt-0.5 border-gray-300 text-[#3c886c] focus:ring-[#3c886c]"
            />
            <span className="text-sm text-[#373737]">
              I agree to WorldGBC featuring our organisation in case studies,
              publications, and promotional materials related to the NZCB
              Commitment.
            </span>
          </label>
        </FormField>
      </div>

      <FormField
        label="Signature (type your full name)"
        required
        error={errors.signature?.message}
        tooltip="Type your full name as your electronic signature to confirm this submission."
      >
        <input
          type="text"
          {...register("signature")}
          className="w-full border border-gray-300 px-3 py-2.5 text-sm italic focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
          placeholder="Type your full name as signature"
        />
      </FormField>
    </div>
  );
}
