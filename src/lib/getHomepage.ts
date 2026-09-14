import { createClient } from "./prismic.ts";
import { asText } from "@prismicio/client";
import type { HomapageDocument } from "../types/prismic.ts";
import type { HomepageData } from "../types/homepage.ts";

export async function getHomepage(): Promise<HomepageData> {
  const client = createClient();
  const doc = await client.getSingle<HomapageDocument>("homapage");
  const data = doc.data;

  return {
    hero: {
      shortText: data.short_text,
      title: data.title,
      text: data.text,
      backgroundImage: data.background_image,
      bgVideo: data.bg_video,
      ctaText: data.cta_text ?? "",
    },
    tesuena: {
      title: data.tesuena_title ?? "",
      cards: data.cards.map((card) => ({
        titleLine1: card.title_line_1 ?? "",
        titleLine2: card.title_line_2 ?? "",
        text: card.texto,
      })),
      endPhrase1: data.end_phrase_1,
      endPhrase2: data.end_phrase_2,
    },
    hacemos: {
      label: data.hacemos_label ?? "",
      title: data.hacemos_title ?? "",
      subtitle: data.hacemos_subtitle ?? "",
      items: data.hacemos_items.map((item) => ({
        titulo: item.titulo ?? "",
        description: item.description,
      })),
      endText: data["hacemos_end-text"],
    },
    servicios: {
      label: data.services_label ?? "",
      title: data.services_title ?? "",
      lines: data.lines_items.map((line) => ({
        title: line.line_title ?? "",
        description: line.service_description ?? "",
        text: line.service_text,
      })),
    },
    diferenciales: {
      label: data.diferenciales_label ?? "",
      title: data.diferenciales_title ?? "",
      subtitle: data.diferenciales_subtitle ?? "",
      inText: data.in_text,
      outText: data.out_text,
    },
    somos: {
      label: data.somos_label ?? "",
      title: data.somos_title ?? "",
      subtitle: data.somos_subtitle ?? "",
      profiles: (data.profiles ?? []).map((p) => ({
        photo: p.profile_picture,
        title: p.profile_title ?? "",
        name: p.profile_name ?? "",
        position: p.profile_position ?? "",
        phone: p.profile_phone ?? "",
        text: p.profile_text,
      })),
      closing: data.end_tagline,
    },
    contacto: {
      title: data.contact_title ?? "",
      text: data.contact_text,
      data: (data.contact_data ?? []).map((item) => ({
        name: item.data_name ?? "",
        position: item.data_position ?? "",
        phone: item.data_phone ?? "",
      })),
    },
  };
}
