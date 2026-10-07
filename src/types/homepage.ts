import type { RichTextField, ImageField, LinkField } from "@prismicio/client";
import type { Propiedad } from "./property";

export type { RichTextField, ImageField };

export interface HomepageCta {
  label: string;
  link: LinkField;
}

export interface HomepageHero {
  titulo: string;
  texto: RichTextField;
  videoFondo: LinkField;
  ctaPrincipal: HomepageCta;
  ctaSecundario: HomepageCta;
  filosofiaLinea1: string;
  filosofiaLinea2: string;
  filosofiaTexto: RichTextField;
}

export interface HomepageDosAreasItem {
  nombre: string;
  tagline: string;
  descripcion: RichTextField;
}

export interface HomepageDosAreas {
  tituloLinea1: string;
  tituloLinea2: string;
  texto: RichTextField;
  imagen: ImageField;
  areas: HomepageDosAreasItem[];
}

export interface HomepageHacemosPaso {
  nombre: string;
  descripcion: RichTextField;
  imagen: ImageField;
}

export interface HomepageHacemos {
  titulo: string;
  subtitulo: string;
  pasos: HomepageHacemosPaso[];
  cta: HomepageCta;
}

export interface HomepageServiciosItem {
  nombre: string;
  descripcion: RichTextField;
}

export interface HomepageServicios {
  titulo: string;
  subtitulo: string;
  items: HomepageServiciosItem[];
}

export interface HomepageInmuebles {
  titulo: string;
  subtitulo: string;
  propiedadesDestacadas: Propiedad[];
  ctaVenta: HomepageCta;
  ctaAlquiler: HomepageCta;
}

export interface HomepageDiferenciales {
  tituloLinea1: string;
  tituloLinea2: string;
  texto: RichTextField;
  imagen: ImageField;
}

export interface HomepageContacto {
  titulo: string;
  texto: RichTextField;
  email: string;
  telefono: string;
  direccion: string;
}

export interface HomepageData {
  hero: HomepageHero;
  dosAreas: HomepageDosAreas;
  hacemos: HomepageHacemos;
  servicios: HomepageServicios;
  inmuebles: HomepageInmuebles;
  diferenciales: HomepageDiferenciales;
  contacto: HomepageContacto;
}
