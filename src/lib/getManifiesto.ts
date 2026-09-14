import { createClient } from "./prismic.ts";
import type { ManifiestoDocument } from "../types/prismic.ts";
import type { ManifiestoData } from "../types/manifiesto.ts";

export async function getManifiesto(): Promise<ManifiestoData> {
  const client = createClient();
  const docs = await client.getAllByType<ManifiestoDocument>("manifiesto");
  const doc = docs[0];

  return {
    text: doc.data.text,
  };
}
