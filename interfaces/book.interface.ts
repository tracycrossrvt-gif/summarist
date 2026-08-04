export type BookStatus = "selected" | "recommended" | "suggested";

export interface Book {
  id: string;
  author: string;
  authorDescription: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  bookDescription: string;
  summary: string;
  averageRating: number;
  totalRating: number;
  keyIdeas: number;
  subscriptionRequired: boolean;
  status: BookStatus;
  tags: string[];
  type: string;
}