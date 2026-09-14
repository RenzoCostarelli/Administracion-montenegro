export type PropertyTag = "ALQUILER" | "VENTA";

export interface Property {
  tag: PropertyTag;
  title: string;
  description: string;
  price: string;
  images?: string[];
  url: string;
}
