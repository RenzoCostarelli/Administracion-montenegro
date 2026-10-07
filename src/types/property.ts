import type { RichTextField } from "@prismicio/client";

export interface Propiedad {
  id: string;
  titulo: string;
  ubicacion: string;
  tipoPropiedad: string;
  descripcion: RichTextField;
  caracteristicas: string[];
  condicionesComerciales: string[];
  disponibleAlquiler: boolean;
  precioAlquiler: string;
  disponibleVenta: boolean;
  precioVenta: string;
  imagenes: string[];
  urlExterna: string | null;
}
