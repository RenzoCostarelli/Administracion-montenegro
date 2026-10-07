import { asLink } from "@prismicio/client";
import { createClient } from "./prismic.ts";
import type { PropiedadDocument } from "../types/prismic.ts";
import type { Propiedad } from "../types/property.ts";

export function mapPropiedad(doc: PropiedadDocument): Propiedad {
  const data = doc.data;

  return {
    id: doc.id,
    titulo: data.titulo ?? "",
    ubicacion: data.ubicacion ?? "",
    tipoPropiedad: data.tipo_propiedad ?? "",
    descripcion: data.descripcion,
    caracteristicas: (data.caracteristicas ?? [])
      .map((item) => item.item)
      .filter((item): item is string => Boolean(item)),
    condicionesComerciales: (data.condiciones_comerciales ?? [])
      .map((item) => item.item)
      .filter((item): item is string => Boolean(item)),
    disponibleAlquiler: data.disponible_alquiler ?? false,
    precioAlquiler: data.precio_alquiler ?? "",
    disponibleVenta: data.disponible_venta ?? false,
    precioVenta: data.precio_venta ?? "",
    imagenes: (data.imagenes ?? [])
      .map((item) => item.imagen?.url)
      .filter((url): url is string => Boolean(url)),
    urlExterna: asLink(data.url_externa),
  };
}

export async function getPropiedades(): Promise<Propiedad[]> {
  const client = createClient();
  const docs = await client.getAllByType<PropiedadDocument>("propiedad");
  return docs.map(mapPropiedad);
}

export async function getPropiedadById(id: string): Promise<Propiedad | null> {
  const client = createClient();
  try {
    const doc = await client.getByID<PropiedadDocument>(id);
    return mapPropiedad(doc);
  } catch {
    return null;
  }
}
