import type {
  PrismicDocument,
  RichTextField,
  ImageField,
  KeyTextField,
  LinkField,
  BooleanField,
  GroupField,
} from "@prismicio/client";

export type {
  PrismicDocument,
  RichTextField,
  ImageField,
  KeyTextField,
  LinkField,
  BooleanField,
};

type HomepageDocumentDataAreasItem = {
  nombre: KeyTextField;
  tagline: KeyTextField;
  descripcion: RichTextField;
};

type HomepageDocumentDataPasosItem = {
  nombre: KeyTextField;
  descripcion: RichTextField;
  imagen: ImageField;
};

type HomepageDocumentDataServiciosItem = {
  nombre: KeyTextField;
  descripcion: RichTextField;
};

type HomepageDocumentDataDestacadasItem = {
  propiedad: LinkField;
};

export type HomepageDocument = PrismicDocument<
  {
    hero_titulo: KeyTextField;
    hero_texto: RichTextField;
    hero_video_fondo: LinkField;
    hero_cta_principal_label: KeyTextField;
    hero_cta_principal_link: LinkField;
    hero_cta_secundario_label: KeyTextField;
    hero_cta_secundario_link: LinkField;
    hero_filosofia_linea_1: KeyTextField;
    hero_filosofia_linea_2: KeyTextField;
    hero_filosofia_texto: RichTextField;

    dosareas_titulo_linea_1: KeyTextField;
    dosareas_titulo_linea_2: KeyTextField;
    dosareas_texto: RichTextField;
    dosareas_imagen: ImageField;
    dosareas_areas: GroupField<HomepageDocumentDataAreasItem>;

    hacemos_titulo: KeyTextField;
    hacemos_subtitulo: KeyTextField;
    hacemos_pasos: GroupField<HomepageDocumentDataPasosItem>;
    hacemos_cta_label: KeyTextField;
    hacemos_cta_link: LinkField;

    servicios_titulo: KeyTextField;
    servicios_subtitulo: KeyTextField;
    servicios_items: GroupField<HomepageDocumentDataServiciosItem>;

    inmuebles_titulo: KeyTextField;
    inmuebles_subtitulo: KeyTextField;
    inmuebles_destacadas: GroupField<HomepageDocumentDataDestacadasItem>;
    inmuebles_cta_venta_label: KeyTextField;
    inmuebles_cta_venta_link: LinkField;
    inmuebles_cta_alquiler_label: KeyTextField;
    inmuebles_cta_alquiler_link: LinkField;

    diferenciales_titulo_linea_1: KeyTextField;
    diferenciales_titulo_linea_2: KeyTextField;
    diferenciales_texto: RichTextField;
    diferenciales_imagen: ImageField;

    contacto_titulo: KeyTextField;
    contacto_texto: RichTextField;
    contacto_email: KeyTextField;
    contacto_telefono: KeyTextField;
    contacto_direccion: KeyTextField;
  },
  "homepage"
>;

type PropiedadDocumentDataImagenesItem = {
  imagen: ImageField;
};

type PropiedadDocumentDataListItem = {
  item: KeyTextField;
};

export type PropiedadDocument = PrismicDocument<
  {
    titulo: KeyTextField;
    ubicacion: KeyTextField;
    tipo_propiedad: KeyTextField;
    descripcion: RichTextField;
    caracteristicas: GroupField<PropiedadDocumentDataListItem>;
    condiciones_comerciales: GroupField<PropiedadDocumentDataListItem>;
    disponible_alquiler: BooleanField;
    precio_alquiler: KeyTextField;
    disponible_venta: BooleanField;
    precio_venta: KeyTextField;
    imagenes: GroupField<PropiedadDocumentDataImagenesItem>;
    url_externa: LinkField;
  },
  "propiedad"
>;

export type ManifiestoDocument = PrismicDocument<
  {
    text: RichTextField;
  },
  "manifiesto"
>;
