import * as prismic from "@prismicio/client";

export const repositoryName = "administracin-montenegro";

export const createClient = () => {
  return prismic.createClient(repositoryName, {
    accessToken: import.meta.env.PRISMIC_ACCESS_TOKEN,
  });
};
