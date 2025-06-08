import 'react-router-dom';

declare module 'react-router-dom' {
  interface ParamTypes {
    slug: string;
  }
}

export interface SanityPost {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any[]; // For portable text
  category: string;
  date: string;
  readTime: string;
  tags?: string[];
  mainImage?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
  };
}