"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/lib/schema";
import FormField from "@/components/ui/FormField";
import Select from "@/components/ui/Select";
import { areaMeasurements } from "@/data/formOptions";

interface SectionPortfolioProps {
  form: UseFormReturn<FormData>;
}

export default function SectionPortfolio({ form }: SectionPortfolioProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const assets = watch("assets") || [];
  const coverageType = watch("coverageType");

  const totalCount = assets.reduce(
    (sum: number, a: { count: number }) => sum + (a.count || 0),
    0
  );
  const totalArea = assets.reduce(
    (sum: number, a: { area: number }) => sum + (a.area || 0),
    0
  );

  const updateAsset = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updated = [...assets];
    updated[index] = { ...updated[index], [field]: value };
    setValue("assets", updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#1d4354] mb-1">
          Section 2: Portfolio & Asset Coverage
        </h2>
        <p className="text-sm text-gray-500">
          Define the scope of your commitment including asset types, counts, and
          total floor area.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Net Zero Target Year"
          required
          error={errors.targetYear?.message}
          tooltip="The year by which your organisation commits to achieving net zero carbon for the reported portfolio."
        >
          <input
            type="number"
            {...register("targetYear")}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
            min={2025}
            max={2050}
          />
        </FormField>

        <FormField
          label="Area Measurement"
          required
          error={errors.areaMeasurement?.message}
          tooltip="Select the floor area measurement standard used across your portfolio. GFA = Gross Floor Area, GLA = Gross Lettable Area, NLA = Net Lettable Area, NIA = Net Internal Area, CFA = Conditioned Floor Area."
        >
          <Select
            {...register("areaMeasurement")}
            options={areaMeasurements}
            placeholder="Select measurement type..."
          />
        </FormField>
      </div>

      <FormField
        label="Coverage Type"
        tooltip="Select whether the commitment covers all your assets or a selected subset."
      >
        <div className="flex gap-4">
          <label
            className={`flex items-center gap-2 px-4 py-2.5 border cursor-pointer transition-colors ${
              coverageType === "All assets"
                ? "bg-[#3c886c]/5 border-[#3c886c] text-[#1d4354]"
                : "bg-white border-gray-200 hover:border-[#3c886c]/50"
            }`}
          >
            <input
              type="radio"
              value="All assets"
              checked={coverageType === "All assets"}
              onChange={() => setValue("coverageType", "All assets")}
              className="text-[#3c886c] focus:ring-[#3c886c]"
            />
            <span className="text-sm font-medium">All assets</span>
          </label>
          <label
            className={`flex items-center gap-2 px-4 py-2.5 border cursor-pointer transition-colors ${
              coverageType === "Selected assets"
                ? "bg-[#3c886c]/5 border-[#3c886c] text-[#1d4354]"
                : "bg-white border-gray-200 hover:border-[#3c886c]/50"
            }`}
          >
            <input
              type="radio"
              value="Selected assets"
              checked={coverageType === "Selected assets"}
              onChange={() => setValue("coverageType", "Selected assets")}
              className="text-[#3c886c] focus:ring-[#3c886c]"
            />
            <span className="text-sm font-medium">Selected assets</span>
          </label>
        </div>
      </FormField>

      <div>
        <h3 className="text-sm font-semibold text-[#1d4354] mb-3">
          Asset Breakdown
        </h3>
        <div className="overflow-x-auto border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#1d4354]">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Asset Type
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-white uppercase tracking-wider w-28">
                  Count
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-white uppercase tracking-wider w-36">
                  Area (m2)
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-white uppercase tracking-wider w-28">
                  Change (%)
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Reason for Change
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {assets.map(
                (
                  asset: {
                    type: string;
                    count: number;
                    area: number;
                    change: number;
                    reason: string;
                  },
                  index: number
                ) => (
                  <tr key={asset.type} className={index % 2 === 1 ? "bg-[#f3f3f3]" : "bg-white"}>
                    <td className="px-4 py-2">
                      <span className="text-sm font-medium text-[#373737]">
                        {asset.type}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={asset.count}
                        onChange={(e) =>
                          updateAsset(
                            index,
                            "count",
                            e.target.value === ""
                              ? 0
                              : Number(e.target.value)
                          )
                        }
                        className="w-full border border-gray-300 px-2 py-1.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
                        min={0}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={asset.area}
                        onChange={(e) =>
                          updateAsset(
                            index,
                            "area",
                            e.target.value === ""
                              ? 0
                              : Number(e.target.value)
                          )
                        }
                        className="w-full border border-gray-300 px-2 py-1.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
                        min={0}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={asset.change}
                        onChange={(e) =>
                          updateAsset(
                            index,
                            "change",
                            e.target.value === ""
                              ? 0
                              : Number(e.target.value)
                          )
                        }
                        className="w-full border border-gray-300 px-2 py-1.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={asset.reason}
                        onChange={(e) =>
                          updateAsset(index, "reason", e.target.value)
                        }
                        className="w-full border border-gray-300 px-2 py-1.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
                        placeholder="If changed, explain why"
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
            <tfoot className="bg-[#1d4354]">
              <tr>
                <td className="px-4 py-2 text-sm font-bold text-white">
                  Total
                </td>
                <td className="px-4 py-2 text-sm font-bold text-white">
                  {totalCount}
                </td>
                <td className="px-4 py-2 text-sm font-bold text-white">
                  {totalArea.toLocaleString()}
                </td>
                <td className="px-4 py-2" />
                <td className="px-4 py-2" />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          label="Assets Added (this period)"
          tooltip="Number of new assets added to your portfolio since the last reporting period."
        >
          <input
            type="number"
            {...register("assetsAdded")}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
            min={0}
          />
        </FormField>
        <FormField
          label="Assets Removed (this period)"
          tooltip="Number of assets removed from your portfolio since the last reporting period."
        >
          <input
            type="number"
            {...register("assetsRemoved")}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
            min={0}
          />
        </FormField>
        <FormField label="Reason for Change">
          <input
            type="text"
            {...register("changeReason")}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
            placeholder="Explain portfolio changes"
          />
        </FormField>
      </div>
    </div>
  );
}
