import { createClient } from "./prismic.ts";
import { getPropiedadById } from "./getPropiedades.ts";
import type { HomepageDocument } from "../types/prismic.ts";
import type { HomepageData } from "../types/homepage.ts";

export async function getHomepage(): Promise<HomepageData> {
  const client = createClient();
  const doc = await client.getSingle<HomepageDocument>("homepage");
  const data = doc.data;

  const propiedadesDestacadas = (
    await Promise.all(
      (data.inmuebles_destacadas ?? []).map((item) =>
        item.propiedad.link_type === "Document"
          ? getPropiedadById(item.propiedad.id)
          : Promise.resolve(null),
      ),
    )
  ).filter((propiedad) => propiedad !== null);

  return {
    hero: {
      titulo: data.hero_titulo ?? "",
      texto: data.hero_texto,
      videoFondo: data.hero_video_fondo,
      ctaPrincipal: {
        label: data.hero_cta_principal_label ?? "",
        link: data.hero_cta_principal_link,
      },
      ctaSecundario: {
        label: data.hero_cta_secundario_label ?? "",
        link: data.hero_cta_secundario_link,
      },
      filosofiaLinea1: data.hero_filosofia_linea_1 ?? "",
      filosofiaLinea2: data.hero_filosofia_linea_2 ?? "",
      filosofiaTexto: data.hero_filosofia_texto,
    },
    dosAreas: {
      tituloLinea1: data.dosareas_titulo_linea_1 ?? "",
      tituloLinea2: data.dosareas_titulo_linea_2 ?? "",
      texto: data.dosareas_texto,
      imagen: data.dosareas_imagen,
      areas: (data.dosareas_areas ?? []).map((area) => ({
        nombre: area.nombre ?? "",
        tagline: area.tagline ?? "",
        descripcion: area.descripcion,
      })),
    },
    hacemos: {
      titulo: data.hacemos_titulo ?? "",
      subtitulo: data.hacemos_subtitulo ?? "",
      pasos: (data.hacemos_pasos ?? []).map((paso) => ({
        nombre: paso.nombre ?? "",
        descripcion: paso.descripcion,
        imagen: paso.imagen,
      })),
      cta: {
        label: data.hacemos_cta_label ?? "",
        link: data.hacemos_cta_link,
      },
    },
    servicios: {
      titulo: data.servicios_titulo ?? "",
      subtitulo: data.servicios_subtitulo ?? "",
      items: (data.servicios_items ?? []).map((item) => ({
        nombre: item.nombre ?? "",
        descripcion: item.descripcion,
      })),
    },
    inmuebles: {
      titulo: data.inmuebles_titulo ?? "",
      subtitulo: data.inmuebles_subtitulo ?? "",
      propiedadesDestacadas,
      ctaVenta: {
        label: data.inmuebles_cta_venta_label ?? "",
        link: data.inmuebles_cta_venta_link,
      },
      ctaAlquiler: {
        label: data.inmuebles_cta_alquiler_label ?? "",
        link: data.inmuebles_cta_alquiler_link,
      },
    },
    diferenciales: {
      tituloLinea1: data.diferenciales_titulo_linea_1 ?? "",
      tituloLinea2: data.diferenciales_titulo_linea_2 ?? "",
      texto: data.diferenciales_texto,
      imagen: data.diferenciales_imagen,
    },
    contacto: {
      titulo: data.contacto_titulo ?? "",
      texto: data.contacto_texto,
      email: data.contacto_email ?? "",
      telefono: data.contacto_telefono ?? "",
      direccion: data.contacto_direccion ?? "",
    },
  };
}
