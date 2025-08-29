export interface Review {
  id: number;
  taleId: number;
  username: string;
  rating: number;
  title?: string;
  body?: string;
  createdAt: string;
}
