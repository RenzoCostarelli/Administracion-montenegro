export interface ServicioItem {
  label: string;
  description?: string;
}

export interface Servicio {
  number: string;
  title: string;
  description: string;
  text: string;
  items?: ServicioItem[];
}
