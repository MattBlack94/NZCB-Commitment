export interface Signatory {
  id: string;
  name: string;
  yearJoined: number;
  commitmentVersion: string;
  ep100: boolean;
  sbti: boolean;
  raceToZero: boolean;
  climatePledge: boolean;
  country: string;
  businessType: string;
}

export const signatories: Signatory[] = [
  {
    id: "001",
    name: "Majid Al Futtaim",
    yearJoined: 2018,
    commitmentVersion: "2019",
    ep100: true,
    sbti: true,
    raceToZero: false,
    climatePledge: false,
    country: "UAE",
    businessType: "Developer",
  },
  {
    id: "002",
    name: "Integral Group",
    yearJoined: 2018,
    commitmentVersion: "2021",
    ep100: true,
    sbti: false,
    raceToZero: false,
    climatePledge: false,
    country: "US",
    businessType: "Professional Services",
  },
  {
    id: "003",
    name: "Signify",
    yearJoined: 2018,
    commitmentVersion: "2019",
    ep100: false,
    sbti: true,
    raceToZero: true,
    climatePledge: true,
    country: "Netherlands",
    businessType: "Product / Material Manufacturer",
  },
  {
    id: "004",
    name: "Cundall",
    yearJoined: 2018,
    commitmentVersion: "2019",
    ep100: true,
    sbti: false,
    raceToZero: true,
    climatePledge: true,
    country: "UK",
    businessType: "Professional Services",
  },
  {
    id: "005",
    name: "Kilroy Realty Corporation (KRC)",
    yearJoined: 2018,
    commitmentVersion: "2019",
    ep100: true,
    sbti: true,
    raceToZero: false,
    climatePledge: false,
    country: "US",
    businessType: "Developer",
  },
];
