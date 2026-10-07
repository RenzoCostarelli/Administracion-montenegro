import { createClient } from "./prismic.ts";
import type { ClientesDocument } from "../types/prismic.ts";
import type { ClientesData } from "../types/clientes.ts";

export async function getClientes(): Promise<ClientesData> {
  const client = createClient();
  const docs = await client.getAllByType<ClientesDocument>("clientes");
  const doc = docs[0];

  return {
    nombres: (doc?.data.clientes ?? [])
      .map((item) => item.nombre)
      .filter((nombre): nombre is string => Boolean(nombre)),
  };
}
