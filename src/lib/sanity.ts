import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { SanityPost } from '@/types/sanity';

export const client = createClient({
  projectId: import.meta.env.VITE_PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-08-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper function to get all posts
export async function getAllPosts(): Promise<SanityPost[]> {
  return await client.fetch(`
    *[_type == "post"] | order(date desc) {
      _id,
      _createdAt,
      _updatedAt,
      title,
      "slug": slug.current,
      excerpt,
      content,
      category,
      date,
      readTime,
      tags,
      mainImage
    }
  `);
}

// Helper function to get recent posts
export async function getRecentPosts(limit: number = 3): Promise<SanityPost[]> {
  return await client.fetch(`
    *[_type == "post"] | order(date desc)[0..${limit - 1}] {
      _id,
      _createdAt,
      _updatedAt,
      title,
      "slug": slug.current,
      excerpt,
      category,
      date,
      readTime,
      tags,
      mainImage
    }
  `);
}