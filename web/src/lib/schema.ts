import { z } from "zod";

// Section 1: Entity & Signatory Details
const section1Schema = z.object({
  entityName: z.string().min(1, "Entity name is required"),
  signatoryId: z.string().min(1, "Signatory ID is required"),
  yearJoined: z.number().min(2018).max(2030),
  commitmentVersion: z.enum(["2019", "2021"]),
  submitterName: z.string().min(1, "Submitter name is required"),
  submitterEmail: z.string().email("Valid email is required"),
  climateInitiatives: z.array(z.string()).default([]),
  consent: z
    .boolean()
    .refine((val) => val === true, "You must consent to proceed"),
  marketingOptIn: z.boolean().default(false),
  signature: z.string().min(1, "Signature is required"),
});

// Section 2: Portfolio & Assets
const assetRowSchema = z.object({
  type: z.string(),
  count: z.coerce.number().min(0).default(0),
  area: z.coerce.number().min(0).default(0),
  change: z.coerce.number().default(0),
  reason: z.string().default(""),
});

const section2Schema = z.object({
  targetYear: z.coerce
    .number()
    .min(2025, "Target year must be 2025 or later")
    .max(2050, "Target year must be 2050 or earlier"),
  areaMeasurement: z.string().min(1, "Area measurement type is required"),
  coverageType: z.enum(["All assets", "Selected assets"]).default("All assets"),
  assets: z.array(assetRowSchema).default([]),
  assetsAdded: z.coerce.number().min(0).default(0),
  assetsRemoved: z.coerce.number().min(0).default(0),
  changeReason: z.string().default(""),
});

// Section 3A: Operational Performance
const operationalDataSchema = z.object({
  totalElectricity: z.coerce.number().min(0).default(0),
  totalNaturalGas: z.coerce.number().min(0).default(0),
  totalCoal: z.coerce.number().min(0).default(0),
  totalOil: z.coerce.number().min(0).default(0),
  totalBiomass: z.coerce.number().min(0).default(0),
  totalBiogas: z.coerce.number().min(0).default(0),
  totalLandfillGas: z.coerce.number().min(0).default(0),
  totalDistrictHeatingCooling: z.coerce.number().min(0).default(0),
  totalOtherFuel: z.coerce.number().min(0).default(0),
  renewableOnSite: z.coerce.number().min(0).default(0),
  renewableOffSite: z.coerce.number().min(0).default(0),
  scope1Emissions: z.coerce.number().min(0).default(0),
  scope2Emissions: z.coerce.number().min(0).default(0),
  carbonOffsets: z.coerce.number().min(0).default(0),
});

const section3ASchema = z.object({
  reportingPeriodFrom: z.string().min(1, "Start date is required"),
  reportingPeriodTo: z.string().min(1, "End date is required"),
  ghgStandard: z.string().min(1, "GHG standard is required"),
  operationalData: operationalDataSchema,
  refrigerantEmissions: z.coerce.number().min(0).default(0),
  refrigerantQuantity: z.coerce.number().min(0).default(0),
  meteredDataPercent: z.coerce.number().min(0).max(100).default(0),
  nonMeteredSource: z.string().default(""),
  verificationMethod: z.string().default(""),
  verifierName: z.string().default(""),
  verifierDate: z.string().default(""),
  verifierLink: z.string().default(""),
  publicDisclosureLink: z.string().default(""),
});

// Section 3B: Embodied Carbon
const embodiedCarbonAssetSchema = z.object({
  name: z.string().default(""),
  completionYear: z.coerce.number().default(0),
  buildingType: z.string().default(""),
  area: z.coerce.number().min(0).default(0),
  upfrontCarbon: z.coerce.number().min(0).default(0),
  calculationTool: z.string().default(""),
  database: z.string().default(""),
  lcaConducted: z.boolean().default(false),
});

const section3BSchema = z.object({
  embodiedCarbonAssets: z.array(embodiedCarbonAssetSchema).default([]),
});

// Section 4: Decarbonisation Actions
const actionRowSchema = z.object({
  category: z.string().default(""),
  target: z.string().default(""),
  milestones: z.string().default(""),
  progress: z.string().default(""),
  status: z.string().default("Not started"),
  scope: z.string().default("Asset level"),
  expectedCompletion: z.string().default(""),
  energySaving: z.coerce.number().min(0).default(0),
  carbonReduction: z.coerce.number().min(0).default(0),
});

const section4Schema = z.object({
  actions: z.array(actionRowSchema).default([]),
  qaUndertaken: z.boolean().default(false),
  qaDetails: z.string().default(""),
  electrificationPlans: z.boolean().default(false),
  electrificationDetails: z.string().default(""),
  offsetType: z.string().default(""),
  offsetSource: z.string().default(""),
});

// Section 5: Advocacy
const advocacyActionSchema = z.object({
  stakeholderType: z.string().default(""),
  actionType: z.string().default(""),
  description: z.string().default(""),
  link: z.string().default(""),
});

const section5Schema = z.object({
  advocacyProgramme: z.boolean().default(false),
  advocacyActions: z.array(advocacyActionSchema).default([]),
  additionalInfo: z.string().default(""),
});

// Section 6: EP100 (conditional)
const section6Schema = z.object({
  ep100TargetYear: z.coerce.number().default(0),
  ep100BaselineYear: z.coerce.number().default(0),
  ep100BaselineIntensity: z.coerce.number().default(0),
  ep100CurrentIntensity: z.coerce.number().default(0),
  ep100ProgressPercent: z.coerce.number().default(0),
  ep100Actions: z.string().default(""),
});

// Full form schema
export const formSchema = z.object({
  // Section 1
  ...section1Schema.shape,
  // Section 2
  ...section2Schema.shape,
  // Section 3A
  ...section3ASchema.shape,
  // Section 3B
  ...section3BSchema.shape,
  // Section 4
  ...section4Schema.shape,
  // Section 5
  ...section5Schema.shape,
  // Section 6
  ...section6Schema.shape,
});

export type FormData = z.infer<typeof formSchema>;

export const defaultFormValues: FormData = {
  // Section 1
  entityName: "",
  signatoryId: "",
  yearJoined: 2018,
  commitmentVersion: "2019",
  submitterName: "",
  submitterEmail: "",
  climateInitiatives: [],
  consent: false,
  marketingOptIn: false,
  signature: "",
  // Section 2
  targetYear: 2030,
  areaMeasurement: "",
  coverageType: "All assets",
  assets: [
    { type: "Residential", count: 0, area: 0, change: 0, reason: "" },
    { type: "Tenanted space", count: 0, area: 0, change: 0, reason: "" },
    {
      type: "Whole building (single)",
      count: 0,
      area: 0,
      change: 0,
      reason: "",
    },
    {
      type: "Whole building (multi-building/campus)",
      count: 0,
      area: 0,
      change: 0,
      reason: "",
    },
    {
      type: "New development / major renovation",
      count: 0,
      area: 0,
      change: 0,
      reason: "",
    },
  ],
  assetsAdded: 0,
  assetsRemoved: 0,
  changeReason: "",
  // Section 3A
  reportingPeriodFrom: "",
  reportingPeriodTo: "",
  ghgStandard: "",
  operationalData: {
    totalElectricity: 0,
    totalNaturalGas: 0,
    totalCoal: 0,
    totalOil: 0,
    totalBiomass: 0,
    totalBiogas: 0,
    totalLandfillGas: 0,
    totalDistrictHeatingCooling: 0,
    totalOtherFuel: 0,
    renewableOnSite: 0,
    renewableOffSite: 0,
    scope1Emissions: 0,
    scope2Emissions: 0,
    carbonOffsets: 0,
  },
  refrigerantEmissions: 0,
  refrigerantQuantity: 0,
  meteredDataPercent: 0,
  nonMeteredSource: "",
  verificationMethod: "",
  verifierName: "",
  verifierDate: "",
  verifierLink: "",
  publicDisclosureLink: "",
  // Section 3B
  embodiedCarbonAssets: [],
  // Section 4
  actions: [
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
  ],
  qaUndertaken: false,
  qaDetails: "",
  electrificationPlans: false,
  electrificationDetails: "",
  offsetType: "",
  offsetSource: "",
  // Section 5
  advocacyProgramme: false,
  advocacyActions: [],
  additionalInfo: "",
  // Section 6 (EP100)
  ep100TargetYear: 0,
  ep100BaselineYear: 0,
  ep100BaselineIntensity: 0,
  ep100CurrentIntensity: 0,
  ep100ProgressPercent: 0,
  ep100Actions: "",
};
