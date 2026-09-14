import type { RichTextField, ImageField, LinkField } from "@prismicio/client";

export type { RichTextField, ImageField };

export interface HomepageHero {
  shortText: RichTextField;
  title: RichTextField;
  text: RichTextField;
  backgroundImage: ImageField;
  bgVideo: LinkField;
  ctaText: string;
}

export interface HomepageTeSuenaCard {
  titleLine1: string;
  titleLine2: string;
  text: RichTextField;
}

export interface HomepageTeSuena {
  title: string;
  cards: HomepageTeSuenaCard[];
  endPhrase1: RichTextField;
  endPhrase2: RichTextField;
}

export interface HomepageHacemosItem {
  titulo: string;
  description: RichTextField;
}

export interface HomepageHacemos {
  label: string;
  title: string;
  subtitle: string;
  items: HomepageHacemosItem[];
  endText: RichTextField;
}

export interface HomepageServiciosLine {
  title: string;
  description: string;
  text: RichTextField;
}

export interface HomepageServicios {
  label: string;
  title: string;
  lines: HomepageServiciosLine[];
}

export interface HomepageDiferenciales {
  label: string;
  title: string;
  subtitle: string;
  inText: RichTextField;
  outText: RichTextField;
}

export interface HomepageSomosProfile {
  photo: ImageField;
  title: string;
  name: string;
  position: string;
  phone: string;
  text: RichTextField;
}

export interface HomepageSomos {
  label: string;
  title: string;
  subtitle: string;
  profiles: HomepageSomosProfile[];
  closing: RichTextField;
}

export interface HomepageContactoDataItem {
  name: string;
  position: string;
  phone: string;
}

export interface HomepageContacto {
  title: string;
  text: RichTextField;
  data: HomepageContactoDataItem[];
}

export interface HomepageData {
  hero: HomepageHero;
  tesuena: HomepageTeSuena;
  hacemos: HomepageHacemos;
  servicios: HomepageServicios;
  diferenciales: HomepageDiferenciales;
  somos: HomepageSomos;
  contacto: HomepageContacto;
}
