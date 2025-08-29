export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface Tale {
  id: number;
  title: string;
  author: string;
  isbn?: string;
  description?: string;
  coverUrl?: string;
  publishedYear?: number;
  tags?: string;
  avgRating?: number | null;
}

export type TaleCreate = {
  title: string;
  author: string;
  isbn?: string;
  description?: string;
  coverUrl?: string;
  publishedYear?: number;
  tags?: string;
};
