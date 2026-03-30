"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/lib/schema";
import FormField from "@/components/ui/FormField";
import Select from "@/components/ui/Select";
import DataTable from "@/components/ui/DataTable";
import {
  ghgStandards,
  verificationMethods,
  buildingTypes,
  calculationTools,
} from "@/data/formOptions";

interface SectionPerformanceProps {
  form: UseFormReturn<FormData>;
  showEmbodiedCarbon: boolean;
}

const fuelLabels: { key: string; label: string; unit: string }[] = [
  { key: "totalElectricity", label: "Electricity", unit: "kWh" },
  { key: "totalNaturalGas", label: "Natural Gas", unit: "kWh" },
  { key: "totalCoal", label: "Coal", unit: "kWh" },
  { key: "totalOil", label: "Oil", unit: "kWh" },
  { key: "totalBiomass", label: "Biomass", unit: "kWh" },
  { key: "totalBiogas", label: "Biogas", unit: "kWh" },
  { key: "totalLandfillGas", label: "Landfill Gas", unit: "kWh" },
  {
    key: "totalDistrictHeatingCooling",
    label: "District Heating / Cooling",
    unit: "kWh",
  },
  { key: "totalOtherFuel", label: "Other Fuel", unit: "kWh" },
];

export default function SectionPerformance({
  form,
  showEmbodiedCarbon,
}: SectionPerformanceProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const operationalData = watch("operationalData");
  const embodiedCarbonAssets = watch("embodiedCarbonAssets") || [];

  // Calculate totals
  const totalEnergy = fuelLabels.reduce(
    (sum, fuel) =>
      sum +
      ((operationalData?.[fuel.key as keyof typeof operationalData] as number) ||
        0),
    0
  );
  const totalRenewable =
    (operationalData?.renewableOnSite || 0) +
    (operationalData?.renewableOffSite || 0);
  const totalEmissions =
    (operationalData?.scope1Emissions || 0) +
    (operationalData?.scope2Emissions || 0);
  const netEmissions = totalEmissions - (operationalData?.carbonOffsets || 0);

  // Calculate total area from assets for intensity
  const assets = watch("assets") || [];
  const totalArea = assets.reduce(
    (sum: number, a: { area: number }) => sum + (a.area || 0),
    0
  );
  const energyIntensity = totalArea > 0 ? totalEnergy / totalArea : 0;
  const carbonIntensity = totalArea > 0 ? totalEmissions / totalArea : 0;

  const addEmbodiedCarbonRow = () => {
    setValue("embodiedCarbonAssets", [
      ...embodiedCarbonAssets,
      {
        name: "",
        completionYear: new Date().getFullYear(),
        buildingType: "",
        area: 0,
        upfrontCarbon: 0,
        calculationTool: "",
        database: "",
        lcaConducted: false,
      },
    ]);
  };

  const removeEmbodiedCarbonRow = (index: number) => {
    setValue(
      "embodiedCarbonAssets",
      embodiedCarbonAssets.filter((_: unknown, i: number) => i !== index)
    );
  };

  const updateEmbodiedCarbonRow = (
    index: number,
    key: string,
    value: unknown
  ) => {
    const updated = [...embodiedCarbonAssets];
    updated[index] = { ...updated[index], [key]: value };
    setValue("embodiedCarbonAssets", updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#1d4354] mb-1">
          Section 3A: Operational Carbon Performance
        </h2>
        <p className="text-sm text-gray-500">
          Report energy consumption, greenhouse gas emissions, and verification
          details for your portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          label="Reporting Period From"
          required
          error={errors.reportingPeriodFrom?.message}
        >
          <input
            type="date"
            {...register("reportingPeriodFrom")}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
          />
        </FormField>
        <FormField
          label="Reporting Period To"
          required
          error={errors.reportingPeriodTo?.message}
        >
          <input
            type="date"
            {...register("reportingPeriodTo")}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
          />
        </FormField>
        <FormField
          label="GHG Standard"
          required
          error={errors.ghgStandard?.message}
          tooltip="The greenhouse gas accounting standard used to calculate your emissions."
        >
          <Select
            {...register("ghgStandard")}
            options={ghgStandards}
            placeholder="Select standard..."
          />
        </FormField>
      </div>

      {/* Energy consumption table */}
      <div>
        <h3 className="text-sm font-semibold text-[#1d4354] mb-3">
          Energy Consumption by Fuel Type
        </h3>
        <div className="overflow-x-auto border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#1d4354]">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Fuel Type
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-white uppercase tracking-wider w-44">
                  Consumption (kWh)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {fuelLabels.map((fuel, index) => (
                <tr key={fuel.key} className={index % 2 === 1 ? "bg-[#f3f3f3]" : "bg-white"}>
                  <td className="px-4 py-2">
                    <span className="text-sm text-[#373737]">{fuel.label}</span>
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      {...register(
                        `operationalData.${fuel.key}` as `operationalData.${
                          | "totalElectricity"
                          | "totalNaturalGas"
                          | "totalCoal"
                          | "totalOil"
                          | "totalBiomass"
                          | "totalBiogas"
                          | "totalLandfillGas"
                          | "totalDistrictHeatingCooling"
                          | "totalOtherFuel"}`
                      )}
                      className="w-full border border-gray-300 px-2 py-1.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
                      min={0}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-[#1d4354]">
              <tr>
                <td className="px-4 py-2 text-sm font-bold text-white">
                  Total Energy
                </td>
                <td className="px-4 py-2 text-sm font-bold text-white">
                  {totalEnergy.toLocaleString()} kWh
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Renewables and Emissions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Renewable Energy (on-site) kWh"
          tooltip="Total on-site renewable energy generation (e.g., rooftop solar)."
        >
          <input
            type="number"
            {...register("operationalData.renewableOnSite")}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
            min={0}
          />
        </FormField>
        <FormField
          label="Renewable Energy (off-site) kWh"
          tooltip="Total off-site renewable energy procurement (e.g., PPAs, green tariffs)."
        >
          <input
            type="number"
            {...register("operationalData.renewableOffSite")}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
            min={0}
          />
        </FormField>
      </div>

      {/* Emissions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          label="Scope 1 Emissions (tCO2e)"
          tooltip="Direct emissions from owned or controlled sources (e.g., on-site combustion, refrigerants)."
        >
          <input
            type="number"
            {...register("operationalData.scope1Emissions")}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
            min={0}
          />
        </FormField>
        <FormField
          label="Scope 2 Emissions (tCO2e)"
          tooltip="Indirect emissions from purchased electricity, heating, and cooling."
        >
          <input
            type="number"
            {...register("operationalData.scope2Emissions")}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
            min={0}
          />
        </FormField>
        <FormField
          label="Carbon Offsets (tCO2e)"
          tooltip="Carbon offsets purchased to compensate for residual emissions."
        >
          <input
            type="number"
            {...register("operationalData.carbonOffsets")}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
            min={0}
          />
        </FormField>
      </div>

      {/* Calculated summary */}
      <div className="bg-[#3c886c]/5 border border-[#3c886c]/20 p-4">
        <h3 className="text-sm font-semibold text-[#1d4354] mb-3">
          Calculated Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Total Energy</p>
            <p className="text-lg font-bold text-[#1d4354]">
              {totalEnergy.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">kWh</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Total Renewables</p>
            <p className="text-lg font-bold text-[#1d4354]">
              {totalRenewable.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">kWh</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Total Emissions</p>
            <p className="text-lg font-bold text-[#1d4354]">
              {totalEmissions.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">tCO2e</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Net Emissions</p>
            <p
              className={`text-lg font-bold ${
                netEmissions <= 0 ? "text-[#6fda44]" : "text-amber-600"
              }`}
            >
              {netEmissions.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">tCO2e</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Energy Intensity</p>
            <p className="text-lg font-bold text-[#1d4354]">
              {energyIntensity.toFixed(1)}
            </p>
            <p className="text-xs text-gray-500">kWh/m2</p>
          </div>
        </div>
        {totalArea > 0 && (
          <div className="mt-2 pt-2 border-t border-[#3c886c]/20">
            <p className="text-xs text-gray-500">
              Carbon intensity: {carbonIntensity.toFixed(2)} tCO2e/m2 | Based on{" "}
              {totalArea.toLocaleString()} m2 total floor area
            </p>
          </div>
        )}
      </div>

      {/* Refrigerants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Refrigerant Emissions (tCO2e)"
          tooltip="Total CO2 equivalent emissions from refrigerant leakage."
        >
          <input
            type="number"
            {...register("refrigerantEmissions")}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
            min={0}
          />
        </FormField>
        <FormField
          label="Refrigerant Quantity (kg)"
          tooltip="Total quantity of refrigerants in use across the portfolio."
        >
          <input
            type="number"
            {...register("refrigerantQuantity")}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
            min={0}
          />
        </FormField>
      </div>

      {/* Data quality */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Metered Data (%)"
          tooltip="Percentage of total energy data that comes from direct metering (vs. estimates)."
        >
          <input
            type="number"
            {...register("meteredDataPercent")}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
            min={0}
            max={100}
          />
        </FormField>
        <FormField
          label="Non-Metered Data Source"
          tooltip="If less than 100% metered, explain the source of non-metered data (e.g., benchmarks, estimates)."
        >
          <input
            type="text"
            {...register("nonMeteredSource")}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
            placeholder="e.g., CIBSE benchmarks, utility estimates"
          />
        </FormField>
      </div>

      {/* Verification */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-sm font-semibold text-[#1d4354] mb-3">
          Verification & Disclosure
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Verification Method"
            tooltip="How your emissions data has been verified or assured."
          >
            <Select
              {...register("verificationMethod")}
              options={verificationMethods}
              placeholder="Select method..."
            />
          </FormField>
          <FormField label="Verifier Name">
            <input
              type="text"
              {...register("verifierName")}
              className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
              placeholder="Name of verifying organisation"
            />
          </FormField>
          <FormField label="Verification Date">
            <input
              type="date"
              {...register("verifierDate")}
              className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
            />
          </FormField>
          <FormField
            label="Verification Report Link"
            tooltip="URL to the verification statement or report, if publicly available."
          >
            <input
              type="url"
              {...register("verifierLink")}
              className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
              placeholder="https://..."
            />
          </FormField>
        </div>
        <FormField
          label="Public Disclosure Link"
          tooltip="Link to your organisation's public sustainability report or emissions disclosure."
        >
          <input
            type="url"
            {...register("publicDisclosureLink")}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3c886c] focus:outline-none focus:ring-1 focus:ring-[#3c886c]"
            placeholder="https://..."
          />
        </FormField>
      </div>

      {/* Section 3B: Embodied Carbon (conditional) */}
      {showEmbodiedCarbon && (
        <div className="border-t border-gray-200 pt-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[#1d4354] mb-1">
              Section 3B: Embodied Carbon
            </h2>
            <p className="text-sm text-gray-500">
              For new developments and major renovations under the 2021
              commitment, report upfront embodied carbon data.
            </p>
          </div>

          <DataTable
            columns={[
              {
                key: "name",
                header: "Asset Name",
                type: "text",
                placeholder: "Building name",
              },
              {
                key: "completionYear",
                header: "Completion Year",
                type: "number",
              },
              {
                key: "buildingType",
                header: "Building Type",
                type: "select",
                options: [...buildingTypes],
              },
              {
                key: "area",
                header: "Area (m2)",
                type: "number",
              },
              {
                key: "upfrontCarbon",
                header: "Upfront Carbon (kgCO2e/m2)",
                type: "number",
              },
              {
                key: "calculationTool",
                header: "Calculation Tool",
                type: "select",
                options: [...calculationTools],
              },
              {
                key: "database",
                header: "EPD / Database",
                type: "text",
                placeholder: "e.g., Ecoinvent",
              },
              {
                key: "lcaConducted",
                header: "LCA Conducted",
                type: "checkbox",
              },
            ]}
            data={embodiedCarbonAssets}
            onCellChange={updateEmbodiedCarbonRow}
            onAddRow={addEmbodiedCarbonRow}
            onRemoveRow={removeEmbodiedCarbonRow}
            addLabel="Add embodied carbon asset"
          />
        </div>
      )}
    </div>
  );
}
