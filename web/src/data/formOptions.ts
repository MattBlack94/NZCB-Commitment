export const commitmentVersions = ["2019", "2021"] as const;

export const climateInitiatives = [
  "EP100",
  "SBTi",
  "Race to Zero",
  "The Climate Pledge",
] as const;

export const assetTypes = [
  "Residential",
  "Tenanted space",
  "Whole building (single)",
  "Whole building (multi-building/campus)",
  "New development / major renovation",
] as const;

export const areaMeasurements = [
  "GFA",
  "GLA",
  "NLA",
  "NIA",
  "CFA",
  "Other",
] as const;

export const ghgStandards = [
  "GHG Protocol",
  "ISO 14064",
  "NABERS",
  "Other",
] as const;

export const verificationMethods = [
  "Third-party certification",
  "Third-party verification",
  "SME self-assessment",
  "Other",
] as const;

export const actionCategories = [
  "Energy Efficiency",
  "Electrification",
  "Fuel Switching",
  "Renewable (on-site)",
  "Renewable (off-site)",
  "Embodied Carbon Reduction",
  "Carbon Offsets",
  "Other",
] as const;

export const actionStatuses = [
  "Not started",
  "In progress",
  "Completed",
] as const;

export const actionScopes = ["Asset level", "Portfolio level"] as const;

export const stakeholderTypes = [
  "Tenants",
  "Owners/Developers",
  "Manufacturers",
  "Policymakers",
  "Customers/Clients",
  "Contractors",
  "Other",
] as const;

export const advocacyActionTypes = [
  "Tenant support",
  "Sustainability services",
  "Supplier engagement",
  "Membership/partnership",
  "Events/speaking",
  "Embodied carbon",
  "Whole life carbon",
  "Other",
] as const;

export const buildingTypes = [
  "Commercial",
  "Education",
  "Healthcare",
  "Industrial",
  "Public",
  "Residential (multi-unit dwelling)",
  "Residential (single-dwelling)",
  "Retail",
] as const;

export const fuelTypes = [
  "Electricity",
  "Natural Gas",
  "Coal",
  "Oil",
  "Biomass",
  "Biogas",
  "Landfill gas",
  "District heating / cooling",
  "Other fuel",
] as const;

export const calculationTools = [
  "OneClick LCA",
  "eTool",
  "Tally",
  "EC3",
  "Other",
] as const;
