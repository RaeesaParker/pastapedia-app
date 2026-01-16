import { Region } from "../types";

export type RegionGroupName =
  | "North"
  | "Central"
  | "South"
  | "Sardinia"
  | "Sicily";

export interface RegionGroup {
  name: RegionGroupName;
  regions: Region[];
  color: string;
  lightColor: string;
}

export const REGION_GROUPS: Record<RegionGroupName, RegionGroup> = {
  North: {
    name: "North",
    regions: [
      "Lombardy",
      "Piedmont",
      "Valle d'Aosta",
      "Liguria",
      "Veneto",
      "Trentino-Alto Adige",
      "Friuli-Venezia Giulia",
      "Emilia-Romagna",
    ],
    color: "#D4E3D4",
    lightColor: "#E8F4E8",
  },
  Central: {
    name: "Central",
    regions: ["Tuscany", "Umbria", "Marche", "Lazio", "Abruzzo", "Molise"],
    color: "#E3D9C8",
    lightColor: "#F0E9DD",
  },
  South: {
    name: "South",
    regions: ["Campania", "Puglia", "Basilicata", "Calabria"],
    color: "#F5E6D3",
    lightColor: "#FAF2E7",
  },
  Sardinia: {
    name: "Sardinia",
    regions: ["Sardinia"],
    color: "#E8D5C4",
    lightColor: "#F2E5D9",
  },
  Sicily: {
    name: "Sicily",
    regions: ["Sicily"],
    color: "#F4E3D1",
    lightColor: "#F9F0E5",
  },
};
