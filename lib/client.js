import sanityClient, { SanityClient } from '@sanity/client';
//import sanityCli from "@/sanity.cli";
import imageUrlBuilder from '@sanity/image-url';

export const client = SanityClient({
    projectId: 'mglax0np',
    dataset: 'production',
    apiVersion: '2023-19-11',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);