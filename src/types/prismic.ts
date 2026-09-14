import type {
  PrismicDocument,
  RichTextField,
  ImageField,
  KeyTextField,
  LinkField,
  GroupField,
} from "@prismicio/client";

export type {
  PrismicDocument,
  RichTextField,
  ImageField,
  KeyTextField,
  LinkField,
};

type HomapageDocumentDataCardsItem = {
  title_line_1: KeyTextField;
  title_line_2: KeyTextField;
  texto: RichTextField;
};

type HomapageDocumentDataHacemosItem = {
  titulo: KeyTextField;
  description: RichTextField;
};

type HomapageDocumentDataLinesItem = {
  line_title: KeyTextField;
  service_description: KeyTextField;
  service_text: RichTextField;
};

type HomapageDocumentDataSomosProfile = {
  profile_picture: ImageField;
  profile_title: KeyTextField;
  profile_name: KeyTextField;
  profile_position: KeyTextField;
  profile_phone: KeyTextField;
  profile_text: RichTextField;
};

type HomapageDocumentDataContactDataItem = {
  data_name: KeyTextField;
  data_position: KeyTextField;
  data_phone: KeyTextField;
};

export type HomapageDocument = PrismicDocument<
  {
    short_text: RichTextField;
    title: RichTextField;
    text: RichTextField;
    background_image: ImageField;
    bg_video: LinkField;
    cta_text: KeyTextField;
    tesuena_title: KeyTextField;
    cards: GroupField<HomapageDocumentDataCardsItem>;
    end_phrase_1: RichTextField;
    end_phrase_2: RichTextField;
    hacemos_label: KeyTextField;
    hacemos_title: KeyTextField;
    hacemos_subtitle: KeyTextField;
    hacemos_items: GroupField<HomapageDocumentDataHacemosItem>;
    "hacemos_end-text": RichTextField;
    services_label: KeyTextField;
    services_title: KeyTextField;
    lines_items: GroupField<HomapageDocumentDataLinesItem>;
    service_cta_text: KeyTextField;
    diferenciales_label: KeyTextField;
    diferenciales_title: KeyTextField;
    diferenciales_subtitle: KeyTextField;
    in_text: RichTextField;
    out_text: RichTextField;
    somos_label: KeyTextField;
    somos_title: KeyTextField;
    somos_subtitle: KeyTextField;
    profiles: GroupField<HomapageDocumentDataSomosProfile>;
    end_tagline: RichTextField;
    contact_title: KeyTextField;
    contact_text: RichTextField;
    contact_data: GroupField<HomapageDocumentDataContactDataItem>;
  },
  "homapage"
>;

export type ManifiestoDocument = PrismicDocument<
  {
    text: RichTextField;
  },
  "manifiesto"
>;
